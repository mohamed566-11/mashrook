
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { User } from '../../types';
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { listUsers, deleteUser, createUser, updateUser, CreateUserRequest, UpdateUserRequest } from '../../services/userService';
import UserFormModal, { UserFormData } from '../../components/admin/UserFormModal';

const usersData: User[] = [
    { id: '1', name: 'System Administrator', email: 'admin@mashroo3k.com', role: 'admin', status: 'Active', analyses: 5, lastLogin: '10/22/2025' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'Active', analyses: 12, lastLogin: '10/22/2025' },
    { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'Active', analyses: 8, lastLogin: '10/22/2025' },
];

const AdminUsers: React.FC = () => {
    const { language, t } = useLanguage();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<{ id: number; name: string; email: string; role: string } | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const token = sessionStorage.getItem('token') || undefined;
            const data = await listUsers(token);
            setUsers(data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to load users', err);
            setLoading(false);
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleAddUser = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEditUser = (user: any) => {
        setEditingUser({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
        setIsModalOpen(true);
    };

    const handleSubmitUser = async (formData: UserFormData) => {
        try {
            const token = sessionStorage.getItem('token') || undefined;

            if (editingUser) {
                // Update existing user
                const updateData: UpdateUserRequest = {
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                    password: formData.password || undefined,
                };
                await updateUser(editingUser.id, updateData, token);
                showNotification('success', 'User updated successfully!');
            } else {
                // Create new user
                const createData: CreateUserRequest = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password!,
                    role: formData.role,
                };
                await createUser(createData, token);
                showNotification('success', 'User created successfully!');
            }

            await loadUsers();
            setIsModalOpen(false);
        } catch (err: any) {
            throw new Error(err?.message || 'Failed to save user');
        }
    };

    const handleDelete = async (id: number, userName: string) => {
        if (!confirm(t("admin.users.deleteConfirmation").replace("{userName}", userName))) return;
        try {
            const token = sessionStorage.getItem('token') || undefined;
            await deleteUser(id, token);
            showNotification('success', t("admin.users.userDeleted"));
            loadUsers();
        } catch (err: any) {
            showNotification('error', t("admin.users.deleteFailed"));
        }
    };

    // Filter users based on search and filters
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();
        const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesRole && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in ${notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                    {notification.type === 'success' ? (
                        <CheckCircle className="text-green-600" size={20} />
                    ) : (
                        <XCircle className="text-red-600" size={20} />
                    )}
                    <span className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                        {notification.message}
                    </span>
                </div>
            )}

            {/* User Form Modal */}
            <UserFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitUser}
                editUser={editingUser}
            />
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{t("admin.users.title")}</h2>
                    <p className="text-sm text-gray-500">{t("admin.users.description")}</p>
                </div>
                <button
                    onClick={handleAddUser}
                    className="h-10 px-4 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover flex items-center gap-2 text-sm"
                >
                    <Plus size={16} /> {t("admin.users.addUser")}
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex items-center gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={t("admin.users.searchPlaceholder")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 ps-10 pe-4 bg-white border border-gray-300 rounded-md text-sm"
                    />
                </div>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="h-10 px-4 bg-white border border-gray-300 rounded-md text-sm"
                    aria-label={t("admin.users.filterByRole")}
                >
                    <option value="all">{t("admin.users.allRoles")}</option>
                    <option value="admin">{t("admin.users.admin")}</option>
                    <option value="user">{t("admin.users.user")}</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 px-4 bg-white border border-gray-300 rounded-md text-sm"
                    aria-label={t("admin.users.filterByStatus")}
                >
                    <option value="all">{t("admin.users.allStatus")}</option>
                    <option value="active">{t("admin.users.active")}</option>
                    <option value="inactive">{t("admin.users.inactive")}</option>
                </select>
                <span className="text-sm text-gray-500 whitespace-nowrap">{t("admin.users.usersCount").replace("{filteredCount}", filteredUsers.length.toString()).replace("{totalCount}", users.length.toString())}</span>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                        <tr>
                            <th className="px-6 py-3">{t("admin.users.table.user")}</th>
                            <th className="px-6 py-3">{t("admin.users.table.role")}</th>
                            <th className="px-6 py-3">{t("admin.users.table.status")}</th>
                            <th className="px-6 py-3">{t("admin.users.table.analyses")}</th>
                            <th className="px-6 py-3">{t("admin.users.table.lastLogin")}</th>
                            <th className="px-6 py-3">{t("admin.users.table.actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    {t("admin.users.noUsersFound")}
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map(user => (
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">{user.name}</div>
                                        <div className="text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}>{user.role}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{user.status}</span>
                                    </td>
                                    <td className="px-6 py-4">{user.analyses}</td>
                                    <td className="px-6 py-4">{user.lastLogin}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                                                title={t("admin.users.editUser")}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.name)}
                                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition"
                                                title={t("admin.users.deleteUser")}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
