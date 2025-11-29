import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, CheckCircle, AlertCircle, Info, AlertTriangle, Trash2, Check, CheckCheck, X } from 'lucide-react';
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

const NotificationDropdown: React.FC = () => {
    const { language, t } = useLanguage();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        if (!user?.id) return;

        try {
            setLoading(true);
            const token = sessionStorage.getItem('token');

            const data = await apiRequest<Notification[]>(
                'GET',
                `/api/notifications/user/${user.id}`,
                undefined,
                token || undefined
            );

            // Limit to most recent 10 notifications in dropdown
            setNotifications(data.slice(0, 10));
            setUnreadCount(data.filter(n => !n.isRead).length);
        } catch (err: any) {
            console.error('Failed to fetch notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId: number, e?: React.MouseEvent) => {
        e?.stopPropagation();

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

    const markAllAsRead = async (e: React.MouseEvent) => {
        e.stopPropagation();
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

    const deleteNotification = async (notificationId: number, e: React.MouseEvent) => {
        e.stopPropagation();

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

    const handleNotificationClick = (notification: Notification) => {
        // Mark as read if not already
        if (!notification.isRead) {
            markAsRead(notification.id);
        }

        // Navigate if there's an action URL
        if (notification.actionUrl) {
            setIsOpen(false);
            navigate(notification.actionUrl);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen && notifications.length === 0) {
            fetchNotifications();
        }
    };

    // Fetch notifications when dropdown opens or periodically
    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    // Poll for new notifications every 30 seconds
    useEffect(() => {
        if (!user?.id) return;

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);

        return () => clearInterval(interval);
    }, [user?.id]);

    // Update time displays every 10 seconds for better real-time accuracy
    useEffect(() => {
        const interval = setInterval(() => {
            // Force a re-render to update relative time displays
            setNotifications(prev => [...prev]);
        }, 10000); // Update every 10 seconds for more responsive time updates

        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-600" />;
            case 'warning':
                return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
            default:
                return <Info className="w-4 h-4 text-blue-600" />;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        // Check if date is valid
        if (isNaN(date.getTime())) {
            console.log('t("auto.NotificationDropdown.6983e1db") string:', dateString);
            return t('notifications.invalidDate');
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
            return `${diffInMinutes}${t('notifications.minuteAgo')}`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);

        // Less than a day
        if (diffInHours < 24) {
            return `${diffInHours}${t('notifications.hourAgo')}`;
        }

        const diffInDays = Math.floor(diffInHours / 24);

        // Less than a week
        if (diffInDays < 7) {
            return `${diffInDays}${t('notifications.dayAgo')}`;
        }

        // More than a week - show full date
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative transition-colors"
                aria-label={t('notifications.notifications')}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[32rem] flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{t('notifications.notifications')}</h3>
                            {unreadCount > 0 && (
                                <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-primary-green hover:text-primary-green-hover font-medium flex items-center gap-1"
                                    title={t('notifications.markAllAsRead')}
                                >
                                    <CheckCheck className="w-4 h-4" />
                                    {t('notifications.markAllRead')}
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                                aria-label={t('common.close')}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="overflow-y-auto flex-1">
                        {loading ? (
                            <div className="p-8 text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green mx-auto"></div>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center">
                                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">{t('notifications.noNotifications')}</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`p-4 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50/30' : ''
                                            } ${notification.actionUrl ? 'cursor-pointer' : ''}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-0.5">
                                                {getNotificationIcon(notification.type)}
                                            </div>

                                            <div className="flex-grow min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                                            {notification.title}
                                                            {!notification.isRead && (
                                                                <span className="w-2 h-2 bg-primary-green rounded-full"></span>
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {formatDate(notification.createdAt)}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-1 flex-shrink-0">
                                                        {!notification.isRead && (
                                                            <button
                                                                onClick={(e) => markAsRead(notification.id, e)}
                                                                className="p-1 text-gray-400 hover:text-primary-green hover:bg-gray-100 rounded transition-colors"
                                                                title={t('notifications.markAsRead')}
                                                                aria-label={t('notifications.markAsRead')}
                                                            >
                                                                <Check className="w-3.5 h-3.5" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={(e) => deleteNotification(notification.id, e)}
                                                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                                                            title={t('common.delete')}
                                                            aria-label={t('notifications.deleteNotification')}
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate('/notifications');
                                }}
                                className="w-full text-center text-sm text-primary-green hover:text-primary-green-hover font-medium"
                            >
                                {t('notifications.viewAllNotifications')}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
