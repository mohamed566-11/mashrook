import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Bell, CheckCircle, AlertCircle, Info, AlertTriangle, Trash2, Check, CheckCheck } from 'lucide-react';
import { apiRequest } from '../services/apiClient';

interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isRead: boolean;
    createdAt: string;
    actionUrl?: string;
}

const Notifications: React.FC = () => {
    const { language, t } = useLanguage();
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        if (!user?.id) return;

        try {
            setLoading(true);
            setError(null);
            const token = sessionStorage.getItem('token');

            const data = await apiRequest<Notification[]>(
                'GET',
                `/api/notifications/user/${user.id}`,
                undefined,
                token || undefined
            );

            setNotifications(data);
            setUnreadCount(data.filter(n => !n.isRead).length);
        } catch (err: any) {
            console.error('Failed to fetch notifications:', err);
            setError(err?.message || 'Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId: number) => {
        try {
            const token = sessionStorage.getItem('token');
            await apiRequest(
                'PUT',
                `/api/notifications/${notificationId}/mark-read`,
                undefined,
                token || undefined
            );

            setNotifications(prev =>
                prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err: any) {
            console.error('Failed to mark notification as read:', err);
        }
    };

    const markAllAsRead = async () => {
        if (!user?.id) return;

        try {
            const token = sessionStorage.getItem('token');
            await apiRequest(
                'PUT',
                `/api/notifications/user/${user.id}/mark-all-read`,
                undefined,
                token || undefined
            );

            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (err: any) {
            console.error('Failed to mark all notifications as read:', err);
        }
    };

    const deleteNotification = async (notificationId: number) => {
        try {
            const token = sessionStorage.getItem('token');
            await apiRequest(
                'DELETE',
                `/api/notifications/${notificationId}`,
                undefined,
                token || undefined
            );

            const notification = notifications.find(n => n.id === notificationId);
            setNotifications(prev => prev.filter(n => n.id !== notificationId));

            if (notification && !notification.isRead) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (err: any) {
            console.error('Failed to delete notification:', err);
        }
    };

    useEffect(() => {
        fetchNotifications();

        // Poll for new notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);

        return () => clearInterval(interval);
    }, [user]);

    // Update time displays every 10 seconds for better real-time accuracy
    useEffect(() => {
        const interval = setInterval(() => {
            // Force a re-render to update relative time displays
            setNotifications(prev => [...prev]);
        }, 10000); // Update every 10 seconds for more responsive time updates

        return () => clearInterval(interval);
    }, []);

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
            default:
                return <Info className="w-5 h-5 text-blue-600" />;
        }
    };

    const getNotificationStyles = (type: string, isRead: boolean) => {
        const baseStyles = 'border-l-4 transition-colors';
        const readOpacity = isRead ? 'opacity-60' : '';

        switch (type) {
            case 'success':
                return `${baseStyles} border-green-500 bg-green-50 ${readOpacity}`;
            case 'error':
                return `${baseStyles} border-red-500 bg-red-50 ${readOpacity}`;
            case 'warning':
                return `${baseStyles} border-yellow-500 bg-yellow-50 ${readOpacity}`;
            default:
                return `${baseStyles} border-blue-500 bg-blue-50 ${readOpacity}`;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        // Check if date is valid
        if (isNaN(date.getTime())) {
            console.log('t("auto.Notifications.6983e1db") string:', dateString);
            return 't("auto.Notifications.6983e1db")';
        }

        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInSeconds = Math.floor(diffInMs / 1000);

        // Log for debugging
        console.log(`Date: ${dateString}, Now: ${now.toISOString()}, Diff: ${diffInSeconds} seconds`);

        // Less than a minute
        if (diffInSeconds < 60) {
            return t('notifications.justNow');
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);

        // Less than an hour
        if (diffInMinutes < 60) {
            if (diffInMinutes === 1) {
                return t('notifications.minuteAgo');
            } else {
                // For languages that need to show the count, we'll need to handle it differently
                // For now, we'll use a simple approach that works with the current translation system
                return `${diffInMinutes} ${t('notifications.minutesAgo')}`;
            }
        }

        const diffInHours = Math.floor(diffInMinutes / 60);

        // Less than a day
        if (diffInHours < 24) {
            if (diffInHours === 1) {
                return t('notifications.hourAgo');
            } else {
                return `${diffInHours} ${t('notifications.hoursAgo')}`;
            }
        }

        const diffInDays = Math.floor(diffInHours / 24);

        // t("auto.Notifications.ebfe9ce8") (1 day ago)
        if (diffInDays === 1) {
            return t('notifications.oneDayAgo');
        }

        // Less than a week
        if (diffInDays < 7) {
            return `${diffInDays} ${t('notifications.daysAgo')}`;
        }

        // More than a week - show full date
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    if (loading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Bell className="w-8 h-8 text-primary-green" />
                        {t('notifications.title')}
                        {unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-bold text-white bg-red-600 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-500 mt-1">{t('notifications.description')}</p>
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-green border border-primary-green rounded-md hover:bg-primary-green hover:text-white transition-colors"
                    >
                        <CheckCheck className="w-4 h-4" />
                        {t('notifications.markAllAsRead')}
                    </button>
                )}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error || t('notifications.failedToLoad')}</span>
                </div>
            )}

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('notifications.noNotifications')}</h3>
                        <p className="text-gray-500">{t('notifications.noNotificationsMessage')}</p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${getNotificationStyles(notification.type, notification.isRead)}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    {getNotificationIcon(notification.type)}
                                </div>

                                <div className="flex-grow min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                {notification.title}
                                                {!notification.isRead && (
                                                    <span className="w-2 h-2 bg-primary-green rounded-full"></span>
                                                )}
                                            </h3>
                                            <p className="text-gray-700 mt-1">{notification.message}</p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                {formatDate(notification.createdAt)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {!notification.isRead && (
                                                <button
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="p-2 text-gray-600 hover:text-primary-green hover:bg-gray-100 rounded-md transition-colors"
                                                    title={t('notifications.markAsRead')}
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteNotification(notification.id)}
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                                                title={t('notifications.deleteNotification')}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {notification.actionUrl && (
                                        <a
                                            href={notification.actionUrl}
                                            className="inline-block mt-3 text-sm font-medium text-primary-green hover:underline"
                                        >
                                            {t('notifications.viewDetails')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;
