import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { User } from '../../types';

const DeveloperUsers: React.FC = () => {
  const { language } = useLanguage();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data for demonstration
    const mockUsers: User[] = [
        { id: '1', name: 'Admin User', email: 'admin@mashroo3k.com', role: 'admin' },
        { id: '2', name: 'Developer User', email: 'dev@mashroo3k.com', role: 'developer' },
        { id: '3', name: 'Regular User', email: 'user@example.com', role: 'user' },
        { id: '4', name: 'Test User', email: 'test@example.com', role: 'user' },
    ];

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            // In a real implementation, this would call an API
            setTimeout(() => {
                setUsers(mockUsers);
                setLoading(false);
            }, 500);
        } catch (err) {
            console.error('Failed to load users', err);
            setLoading(false);
        }
    };

    const handleCreateUser = () => {
        alert('Create user functionality would be implemented here');
    };

    const handleEditUser = (id: string) => {
        alert(`Edit user ${id} functionality would be implemented here`);
    };

    const handleDeleteUser = (id: string) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const handleViewUser = (id: string) => {
        alert(`Viewing user ${id}`);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleBadgeClass = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'developer': return 'bg-blue-100 text-blue-800';
            case 'user': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="t("auto.AdminLayout.6adb5be9")">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                    <p className="text-gray-600 mt-1">Manage all users, roles, and permissions</p>
                </div>
                <button
                    onClick={handleCreateUser}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Add New User
                </button>
            </div>

            <div className="t("auto.AdminLayout.b10df59b")">
                <div className="t("auto.UserFormModal.99c483e1")">
                    <input
                        type="t("auto.Program.1cb251ec")"
                        placeholder="t("auto.DeveloperUsers.f5e8b59c")"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="t("auto.DeveloperApiKeys.fb222b7a")">
                            <tr>
                                <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="t("auto.DeveloperApiKeys.d89e2ddb")" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-green-800 font-medium">
                                                        {user.name.charAt(0)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="t("auto.DeveloperTools.04c50002")">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex rtl:justify-start space-x-2">
                                            <button
                                                onClick={() => handleViewUser(user.id!)}
                                                className="text-gray-500 hover:text-gray-700"
                                                title="t("common.view")"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEditUser(user.id!)}
                                                className="text-blue-500 hover:text-blue-700"
                                                title="t("common.edit")"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id!)}
                                                className="text-red-500 hover:text-red-700"
                                                title="t("common.delete")"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DeveloperUsers;