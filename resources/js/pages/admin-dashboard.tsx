import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface SharedData {
    auth: {
        user: User;
    };
    [key: string]: unknown;
}

export default function AdminDashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const getRoleTitle = (role: string) => {
        switch (role) {
            case 'admin_hr': return '👥 Admin HR';
            case 'admin_administrator': return '📊 Administrator';
            case 'admin_gudang': return '📦 Admin Gudang';
            default: return 'Admin';
        }
    };

    const getMenuItems = (role: string) => {
        switch (role) {
            case 'admin_hr':
                return [
                    { title: 'Kelola Karyawan', href: '/employees', icon: '👥', desc: 'Tambah, edit, hapus data karyawan' },
                    { title: 'Daftar Karyawan', href: '/employees', icon: '📋', desc: 'Lihat semua karyawan aktif' },
                ];
            case 'admin_administrator':
                return [
                    { title: 'Verifikasi Permintaan', href: '/admin/requests', icon: '✅', desc: 'Lihat dan verifikasi permintaan harian' },
                    { title: 'Laporan & Analytics', href: '/admin/reports', icon: '📈', desc: 'Download laporan Excel dan analisis data' },
                ];
            case 'admin_gudang':
                return [
                    { title: 'Permintaan Pending', href: '/warehouse/pending', icon: '⏳', desc: 'Setujui permintaan yang masuk' },
                    { title: 'Siap Diambil', href: '/warehouse/ready', icon: '📦', desc: 'Kelola stok yang siap diambil' },
                ];
            default:
                return [];
        }
    };

    const menuItems = getMenuItems(user.role);

    return (
        <>
            <Head title="Admin Dashboard - Sistem Jatah Galon" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    🚰 Sistem Jatah Galon
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    {getRoleTitle(user.role)} - {user.name}
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <Link href="/">
                                    <Button variant="outline">
                                        🏠 Portal Utama
                                    </Button>
                                </Link>
                                <Link href="/logout" method="post">
                                    <Button variant="outline">
                                        🚪 Logout
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-blue-800 font-medium">
                                Selamat datang di panel admin! Pilih menu di bawah untuk mengelola sistem.
                            </p>
                        </div>
                    </div>

                    {/* Menu Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {menuItems.map((item, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-xl">
                                        <span className="mr-3 text-2xl">{item.icon}</span>
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-4">{item.desc}</p>
                                    <Link href={item.href}>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                            Buka {item.title}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <span className="mr-2">📊</span>
                                Statistik Cepat
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                                    <div className="text-2xl font-bold text-green-800">-</div>
                                    <p className="text-sm text-green-600">Total Karyawan</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                                    <div className="text-2xl font-bold text-blue-800">-</div>
                                    <p className="text-sm text-blue-600">Permintaan Hari Ini</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
                                    <div className="text-2xl font-bold text-yellow-800">-</div>
                                    <p className="text-sm text-yellow-600">Pending Approval</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
                                    <div className="text-2xl font-bold text-purple-800">-</div>
                                    <p className="text-sm text-purple-600">Siap Diambil</p>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500">
                                    Statistik akan dimuat setelah mengakses menu yang sesuai
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Info */}
                    <div className="mt-8 text-center">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">ℹ️ Informasi Sistem</h3>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <strong>Kuota Bulanan:</strong>
                                    <br />G7-G8: 24 galon • G9: 12 galon
                                    <br />G10: 10 galon • G11-G13: 7 galon
                                </div>
                                <div>
                                    <strong>Status Permintaan:</strong>
                                    <br />Pending → Approved → Collected
                                </div>
                                <div>
                                    <strong>Reset Kuota:</strong>
                                    <br />Otomatis setiap tanggal 1 bulan
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}