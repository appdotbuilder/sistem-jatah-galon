import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="Sistem Jatah Galon - Kelola Distribusi Galon Karyawan" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-blue-600 p-4 rounded-full mr-4">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900">
                                🚰 Sistem Jatah Galon
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Kelola distribusi galon air minum karyawan dengan sistem kuota bulanan yang terintegrasi
                        </p>
                    </div>

                    {/* Employee Section */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    👨‍💼 Portal Karyawan
                                </h2>
                                <p className="text-gray-600">
                                    Scan ID karyawan untuk mengakses informasi kuota dan mengajukan permintaan galon
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                                        <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                                            ✅ Cek Kuota Bulanan
                                        </h3>
                                        <ul className="space-y-2 text-green-700">
                                            <li>• Lihat kuota bulan ini</li>
                                            <li>• Sisa kuota tersedia</li>
                                            <li>• Riwayat pengambilan galon</li>
                                            <li>• Data historis lengkap</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                                        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                                            📝 Input Permintaan
                                        </h3>
                                        <ul className="space-y-2 text-blue-700">
                                            <li>• Ajukan permintaan galon</li>
                                            <li>• Sistem validasi kuota otomatis</li>
                                            <li>• Tracking status permintaan</li>
                                            <li>• Notifikasi real-time</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                                        <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                                            🔍 Verifikasi Pengambilan
                                        </h3>
                                        <ul className="space-y-2 text-purple-700">
                                            <li>• Scan ID untuk konfirmasi</li>
                                            <li>• Lihat galon siap diambil</li>
                                            <li>• Klik verifikasi pengambilan</li>
                                            <li>• Update otomatis ke sistem</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
                                        <h3 className="text-lg font-semibold text-orange-800 mb-3">
                                            📊 Kuota Berdasarkan Grade
                                        </h3>
                                        <div className="space-y-1 text-sm text-orange-700">
                                            <div className="flex justify-between"><span>G7 - G8:</span> <span className="font-semibold">24 galon/bulan</span></div>
                                            <div className="flex justify-between"><span>G9:</span> <span className="font-semibold">12 galon/bulan</span></div>
                                            <div className="flex justify-between"><span>G10:</span> <span className="font-semibold">10 galon/bulan</span></div>
                                            <div className="flex justify-between"><span>G11-G13:</span> <span className="font-semibold">7 galon/bulan</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <Link href="/gallon-system">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                                        🔍 Mulai Scan ID Karyawan
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Admin Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    🔐 Portal Admin
                                </h2>
                                <p className="text-gray-600">
                                    Akses khusus untuk manajemen sistem dan laporan
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 rounded-lg border border-red-200">
                                    <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                                        👥 Admin HR
                                    </h3>
                                    <ul className="space-y-2 text-red-700 text-sm">
                                        <li>• Kelola data karyawan</li>
                                        <li>• Tambah/edit/hapus karyawan</li>
                                        <li>• Update grade dan department</li>
                                        <li>• Manajemen status aktif</li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
                                    <h3 className="text-lg font-semibold text-indigo-800 mb-3 flex items-center">
                                        📈 Admin Administrator
                                    </h3>
                                    <ul className="space-y-2 text-indigo-700 text-sm">
                                        <li>• Verifikasi semua permintaan</li>
                                        <li>• Download laporan Excel</li>
                                        <li>• Data harian dan bulanan</li>
                                        <li>• Analytics lengkap</li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-200">
                                    <h3 className="text-lg font-semibold text-teal-800 mb-3 flex items-center">
                                        📦 Admin Gudang
                                    </h3>
                                    <ul className="space-y-2 text-teal-700 text-sm">
                                        <li>• Lihat permintaan pending</li>
                                        <li>• Konfirmasi ketersediaan stok</li>
                                        <li>• Approve siap diambil</li>
                                        <li>• Update status gudang</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="text-center space-x-4">
                                <Link href="/login">
                                    <Button variant="outline" size="lg" className="px-8 py-4">
                                        🔑 Login Admin
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="outline" size="lg" className="px-8 py-4">
                                        📝 Register Admin
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Features Highlight */}
                        <div className="mt-12 text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                ⚡ Fitur Unggulan Sistem
                            </h2>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <div className="text-3xl mb-2">📱</div>
                                    <h3 className="font-semibold">No Login Required</h3>
                                    <p className="text-sm text-gray-600">Karyawan akses dengan scan ID</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <div className="text-3xl mb-2">⏱️</div>
                                    <h3 className="font-semibold">Real-time Update</h3>
                                    <p className="text-sm text-gray-600">Status terkini setiap saat</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <div className="text-3xl mb-2">📊</div>
                                    <h3 className="font-semibold">Complete Reports</h3>
                                    <p className="text-sm text-gray-600">Laporan Excel lengkap</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <div className="text-3xl mb-2">🔒</div>
                                    <h3 className="font-semibold">Role-based Access</h3>
                                    <p className="text-sm text-gray-600">Keamanan tingkat admin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}