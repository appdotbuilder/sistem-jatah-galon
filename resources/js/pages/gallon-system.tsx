import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GallonSystem() {
    const [employeeId, setEmployeeId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLookup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!employeeId.trim()) return;

        setIsLoading(true);
        router.post(route('employee.lookup'), 
            { employee_id: employeeId },
            {
                onFinish: () => setIsLoading(false),
                preserveState: false
            }
        );
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!employeeId.trim()) return;

        setIsLoading(true);
        router.post(route('employee.verify'), 
            { employee_id: employeeId },
            {
                onFinish: () => setIsLoading(false),
                preserveState: false
            }
        );
    };

    return (
        <>
            <Head title="Sistem Jatah Galon - Scan ID Karyawan" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            🚰 Sistem Jatah Galon
                        </h1>
                        <p className="text-gray-600">
                            Masukkan ID Karyawan untuk mengakses sistem
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        {/* Employee ID Input */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-center flex items-center justify-center">
                                    <span className="mr-2">🔍</span>
                                    Identifikasi Karyawan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleLookup} className="space-y-4">
                                    <div>
                                        <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700 mb-2">
                                            ID Karyawan
                                        </label>
                                        <Input
                                            id="employee_id"
                                            type="text"
                                            value={employeeId}
                                            onChange={(e) => setEmployeeId(e.target.value)}
                                            placeholder="Masukkan ID karyawan (contoh: EMP0001)"
                                            className="text-center text-lg font-mono"
                                            required
                                        />
                                    </div>
                                    <Button 
                                        type="submit" 
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                        disabled={isLoading || !employeeId.trim()}
                                        size="lg"
                                    >
                                        {isLoading ? '🔄 Memproses...' : '👤 Cek Data Karyawan'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Action Cards */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                                <CardHeader>
                                    <CardTitle className="text-green-800 flex items-center">
                                        <span className="mr-2">📊</span>
                                        Cek Kuota & Input
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-green-700">
                                    <p className="mb-4">
                                        Gunakan tombol "Cek Data Karyawan" di atas untuk:
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li>✅ Melihat kuota bulanan</li>
                                        <li>✅ Cek sisa kuota</li>
                                        <li>✅ Riwayat pengambilan</li>
                                        <li>✅ Ajukan permintaan galon</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
                                <CardHeader>
                                    <CardTitle className="text-purple-800 flex items-center">
                                        <span className="mr-2">✅</span>
                                        Verifikasi Output
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-purple-700 mb-4">
                                        Untuk konfirmasi pengambilan galon yang sudah disetujui gudang:
                                    </p>
                                    <Button
                                        onClick={handleVerify}
                                        className="w-full bg-purple-600 hover:bg-purple-700"
                                        disabled={isLoading || !employeeId.trim()}
                                        variant="outline"
                                    >
                                        {isLoading ? '🔄 Memproses...' : '🎯 Verifikasi Pengambilan'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Info Section */}
                        <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-orange-200">
                            <CardHeader>
                                <CardTitle className="text-orange-800 flex items-center justify-center">
                                    <span className="mr-2">💡</span>
                                    Informasi Sistem
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-orange-700">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">Kuota Bulanan:</h4>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span>G7 - G8:</span>
                                                <span className="font-semibold">24 galon</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>G9:</span>
                                                <span className="font-semibold">12 galon</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>G10:</span>
                                                <span className="font-semibold">10 galon</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>G11-G13:</span>
                                                <span className="font-semibold">7 galon</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Status Permintaan:</h4>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                                                <span>Pending - Menunggu persetujuan</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                                                <span>Disetujui - Siap diambil</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                                                <span>Selesai - Sudah diambil</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Back to Home */}
                        <div className="text-center mt-8">
                            <Button 
                                variant="outline" 
                                onClick={() => router.get('/')}
                                className="px-6"
                            >
                                🏠 Kembali ke Beranda
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}