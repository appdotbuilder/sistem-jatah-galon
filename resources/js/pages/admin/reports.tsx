import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminReports() {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadDaily = () => {
        setIsDownloading(true);
        // This would normally trigger a download
        setTimeout(() => {
            setIsDownloading(false);
            alert('Download daily report feature akan diimplementasikan dengan controller Excel export');
        }, 1000);
    };

    const handleDownloadRange = () => {
        if (!dateFrom || !dateTo) {
            alert('Pilih tanggal dari dan sampai terlebih dahulu');
            return;
        }
        setIsDownloading(true);
        // This would normally trigger a download
        setTimeout(() => {
            setIsDownloading(false);
            alert('Download range report feature akan diimplementasikan dengan controller Excel export');
        }, 1000);
    };

    return (
        <>
            <Head title="Laporan & Analytics - Administrator" />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    📈 Laporan & Analytics
                                </h1>
                                <p className="text-gray-600">
                                    Download laporan data aktivitas dan analytics sistem
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <Button 
                                    variant="outline"
                                    onClick={() => router.get('/admin/requests')}
                                >
                                    ✅ Verifikasi Permintaan
                                </Button>
                                <Button 
                                    variant="outline"
                                    onClick={() => router.get('/dashboard')}
                                >
                                    🏠 Dashboard
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Daily Reports */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">📊</span>
                                    Laporan Harian
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                        <h4 className="font-semibold text-green-800 mb-2">
                                            Data Hari Ini
                                        </h4>
                                        <p className="text-sm text-green-700 mb-4">
                                            Download semua aktivitas input dan output untuk hari ini dalam format Excel.
                                        </p>
                                        <Button
                                            onClick={handleDownloadDaily}
                                            disabled={isDownloading}
                                            className="w-full bg-green-600 hover:bg-green-700"
                                        >
                                            {isDownloading ? '🔄 Downloading...' : '📥 Download Laporan Hari Ini'}
                                        </Button>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h4 className="font-semibold text-blue-800 mb-2">
                                            Isi Laporan Harian:
                                        </h4>
                                        <ul className="text-sm text-blue-700 space-y-1">
                                            <li>• Data permintaan (Input) hari ini</li>
                                            <li>• Data pengambilan (Output) hari ini</li>
                                            <li>• Status approval gudang</li>
                                            <li>• Informasi karyawan lengkap</li>
                                            <li>• Timestamp semua aktivitas</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Range Reports */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">📅</span>
                                    Laporan Periode
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="date-from" className="block text-sm font-medium text-gray-700 mb-2">
                                            Dari Tanggal
                                        </label>
                                        <Input
                                            id="date-from"
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => setDateFrom(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="date-to" className="block text-sm font-medium text-gray-700 mb-2">
                                            Sampai Tanggal
                                        </label>
                                        <Input
                                            id="date-to"
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => setDateTo(e.target.value)}
                                        />
                                    </div>

                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                        <h4 className="font-semibold text-purple-800 mb-2">
                                            Laporan Komprehensif
                                        </h4>
                                        <p className="text-sm text-purple-700 mb-4">
                                            Download semua aktivitas dalam rentang tanggal yang dipilih.
                                        </p>
                                        <Button
                                            onClick={handleDownloadRange}
                                            disabled={isDownloading || !dateFrom || !dateTo}
                                            className="w-full bg-purple-600 hover:bg-purple-700"
                                        >
                                            {isDownloading ? '🔄 Downloading...' : '📥 Download Laporan Periode'}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Statistics Overview */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <span className="mr-2">📊</span>
                                Overview Statistik
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="bg-blue-100 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-800">-</div>
                                        <p className="text-sm text-blue-600">Total Karyawan Aktif</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-green-100 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-green-800">-</div>
                                        <p className="text-sm text-green-600">Permintaan Bulan Ini</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-yellow-100 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-yellow-800">-</div>
                                        <p className="text-sm text-yellow-600">Pending Approval</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-purple-100 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-800">-</div>
                                        <p className="text-sm text-purple-600">Galon Terdistribusi</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500">
                                    Statistik real-time akan ditampilkan setelah implementasi lengkap
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Features */}
                    <Card className="mt-6 bg-gradient-to-br from-amber-50 to-orange-100 border-orange-200">
                        <CardHeader>
                            <CardTitle className="text-orange-800 flex items-center">
                                <span className="mr-2">⚡</span>
                                Fitur Laporan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-orange-700">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-2">📥 Format Excel</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>• Data terstruktur dan mudah dianalisis</li>
                                        <li>• Headers yang jelas dan informatif</li>
                                        <li>• Ready untuk pivot table dan chart</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">🔍 Detail Informasi</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>• Data karyawan lengkap (ID, nama, dept)</li>
                                        <li>• Timestamp request dan collection</li>
                                        <li>• Status approval dan workflow</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}