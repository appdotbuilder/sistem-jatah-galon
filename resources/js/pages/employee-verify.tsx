import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
}

interface GallonRequest {
    id: number;
    quantity: number;
    status: string;
    requested_at: string;
    approved_at: string;
}

interface Props {
    employee: Employee;
    readyRequests: GallonRequest[];
    [key: string]: unknown;
}

export default function EmployeeVerify({ employee, readyRequests }: Props) {
    const [isSubmitting, setIsSubmitting] = useState<number | null>(null);

    const handleCollect = (requestId: number) => {
        setIsSubmitting(requestId);
        router.post(route('gallon.collect'), {
            request_id: requestId
        }, {
            onFinish: () => setIsSubmitting(null),
            preserveState: true,
            preserveScroll: true
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const totalGallons = readyRequests.reduce((sum, request) => sum + request.quantity, 0);

    return (
        <>
            <Head title={`Verifikasi Pengambilan - ${employee.name}`} />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    ✅ Verifikasi Pengambilan
                                </h1>
                                <p className="text-gray-600">
                                    {employee.name} • {employee.employee_id}
                                </p>
                            </div>
                            <Button 
                                variant="outline"
                                onClick={() => router.get('/')}
                            >
                                🏠 Beranda
                            </Button>
                        </div>

                        {/* Summary */}
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-purple-800">
                                        Siap Diambil
                                    </h3>
                                    <p className="text-purple-600">
                                        Total {totalGallons} galon menunggu konfirmasi
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-purple-800">
                                        {totalGallons}
                                    </div>
                                    <p className="text-sm text-purple-600">galon</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        {/* Ready Requests */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">📦</span>
                                    Galon Siap Diambil
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {readyRequests.length > 0 ? (
                                    <div className="space-y-4">
                                        {readyRequests.map((request) => (
                                            <div key={request.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-blue-800">
                                                            {request.quantity} Galon
                                                        </h3>
                                                        <p className="text-sm text-blue-600">
                                                            Disetujui: {formatDate(request.approved_at)}
                                                        </p>
                                                    </div>
                                                    <Badge className="bg-blue-100 text-blue-800">
                                                        Siap Diambil
                                                    </Badge>
                                                </div>

                                                <div className="bg-white p-3 rounded-lg mb-3">
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        ⚠️ <strong>Konfirmasi Pengambilan:</strong>
                                                    </p>
                                                    <p className="text-sm text-gray-700">
                                                        Klik tombol "Konfirmasi" setelah Anda mengambil {request.quantity} galon 
                                                        dari gudang. Pastikan jumlah galon yang diambil sesuai.
                                                    </p>
                                                </div>

                                                <Button
                                                    onClick={() => handleCollect(request.id)}
                                                    disabled={isSubmitting === request.id}
                                                    className="w-full bg-green-600 hover:bg-green-700"
                                                    size="lg"
                                                >
                                                    {isSubmitting === request.id 
                                                        ? '🔄 Memproses...' 
                                                        : `✅ Konfirmasi Ambil ${request.quantity} Galon`
                                                    }
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">📭</div>
                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                            Tidak Ada Galon Siap Diambil
                                        </h3>
                                        <p className="text-gray-500 mb-6">
                                            Belum ada permintaan yang disetujui gudang untuk bulan ini.
                                        </p>
                                        <div className="space-x-4">
                                            <Button
                                                variant="outline"
                                                onClick={() => router.post(route('employee.lookup'), { employee_id: employee.employee_id })}
                                            >
                                                📊 Lihat Dashboard
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => router.get('/')}
                                            >
                                                🏠 Beranda
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Instructions */}
                        <Card className="mt-6 bg-gradient-to-br from-amber-50 to-orange-100 border-orange-200">
                            <CardHeader>
                                <CardTitle className="text-orange-800 flex items-center">
                                    <span className="mr-2">💡</span>
                                    Petunjuk Pengambilan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-orange-700">
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start">
                                        <span className="text-lg mr-2">1️⃣</span>
                                        <p>Tunjukkan ID karyawan kepada petugas gudang</p>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-lg mr-2">2️⃣</span>
                                        <p>Ambil galon sesuai jumlah yang disetujui</p>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-lg mr-2">3️⃣</span>
                                        <p>Pastikan galon dalam kondisi baik dan bersih</p>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-lg mr-2">4️⃣</span>
                                        <p><strong>Klik "Konfirmasi" setelah galon berhasil diambil</strong></p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Navigation */}
                        <div className="mt-8 text-center space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => router.post(route('employee.lookup'), { employee_id: employee.employee_id })}
                            >
                                📊 Dashboard Karyawan
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.get('/')}
                            >
                                🔄 Scan ID Lain
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}