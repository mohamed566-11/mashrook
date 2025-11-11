
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AdminUser } from '../../types';
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { listUsers, deleteUser, createUser, updateUser, CreateUserRequest, UpdateUserRequest } from '../../services/userService';
import UserFormModal, { UserFormData } from '../../components/admin/UserFormModal';

const usersData: AdminUser[] = [
    { id: '1', name: 'System Administrator', email: 'admin@mashroo3k.com', role: 'Admin', status: 'Active', analyses: 5, lastLogin: '10/22/2025' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', analyses: 12, lastLogin: '10/22/2025' },
    { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', analyses: 8, lastLogin: '10/22/2025' },
];

const AdminUsers: React.FC = () => {
  const { language } = useLanguage();
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
        if (!confirm(`Are you sure you want to delete user "t("auto.AdminUsers.18f80748")"? This action cannot be undone.`)) return;
        try {
            const token = sessionStorage.getItem('token') || undefined;
            await deleteUser(id, token);
            showNotification('success', 'User deleted successfully!');
            loadUsers();
        } catch (err: any) {
            showNotification('error', err?.message || 'Failed to delete user');
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
                    <h2 className="text-xl font-bold text-gray-800">User Management</h2>
                    <p className="text-sm text-gray-500">Manage user accounts and permissions</p>
                </div>
                <button
                    onClick={handleAddUser}
                    className="h-10 px-4 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover flex items-center gap-2 text-sm"
                >
                    <Plus size={16} /> Add User
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex items-center gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="t("auto.Program.1cb251ec")"
                        placeholder="t("auto.AdminUsers.f5e8b59c")"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 ps-10 pe-4 bg-white border border-gray-300 rounded-md text-sm"
                    />
                </div>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="h-10 px-4 bg-white border border-gray-300 rounded-md text-sm"
                    aria-label="t("auto.AdminUsers.55aaa373")"
                >
                    <option value="t("auto.AdminUsers.a181a603")">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 px-4 bg-white border border-gray-300 rounded-md text-sm"
                    aria-label="t("auto.AdminUsers.61baad7c")"
                >
                    <option value="t("auto.AdminUsers.a181a603")">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <span className="text-sm text-gray-500 whitespace-nowrap">{filteredUsers.length} of {users.length} users</span>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                        <tr>
                            <th className="t("auto.AdminUsers.ff88093a")">User</th>
                            <th className="t("auto.AdminUsers.ff88093a")">Role</th>
                            <th className="t("auto.AdminUsers.ff88093a")">Status</th>
                            <th className="t("auto.AdminUsers.ff88093a")">Analyses</th>
                            <th className="t("auto.AdminUsers.ff88093a")">Last Login</th>
                            <th className="t("auto.AdminUsers.ff88093a")">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    No users found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map(user => (
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    <td className="t("auto.AdminUsers.ff88093a")">
                                        <div className="font-semibold">{user.name}</div>
                                        <div className="text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="t("auto.AdminUsers.ff88093a")">
                                        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}>{user.role}</span>
                                    </td>
                                    <td className="t("auto.AdminUsers.ff88093a")">
                                        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{user.status}</span>
                                    </td>
                                    <td className="t("auto.AdminUsers.ff88093a")">{user.analyses}</td>
                                    <td className="t("auto.AdminUsers.ff88093a")">{user.lastLogin}</td>
                                    <td className="t("auto.AdminUsers.ff88093a")">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                                                title="t("admin.editUser")"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.name)}
                                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition"
                                                title="t("admin.deleteUser")"
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
