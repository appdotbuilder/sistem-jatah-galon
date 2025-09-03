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
    employee: Employee;
}

interface Props {
    requests: {
        data: GallonRequest[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    [key: string]: unknown;
}

export default function PendingRequests({ requests }: Props) {
    const [approvingId, setApprovingId] = useState<number | null>(null);

    const handleApprove = (requestId: number) => {
        setApprovingId(requestId);
        router.patch(`/gallon-requests/${requestId}`, {
            action: 'approve_warehouse'
        }, {
            onFinish: () => setApprovingId(null),
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

    return (
        <>
            <Head title="Permintaan Pending - Admin Gudang" />
            <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    ⏳ Permintaan Pending
                                </h1>
                                <p className="text-gray-600">
                                    Setujui permintaan galon yang masuk dari karyawan
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <Button 
                                    variant="outline"
                                    onClick={() => router.get('/warehouse/ready')}
                                >
                                    📦 Siap Diambil
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

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <span className="mr-2">📋</span>
                                Daftar Permintaan Pending
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {requests.data.length > 0 ? (
                                <div className="space-y-4">
                                    {requests.data.map((request) => (
                                        <div key={request.id} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {request.employee.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        ID: {request.employee.employee_id} • 
                                                        {request.employee.department} • 
                                                        Grade {request.employee.grade}
                                                    </p>
                                                </div>
                                                <Badge className="bg-yellow-100 text-yellow-800">
                                                    Pending
                                                </Badge>
                                            </div>

                                            <div className="bg-white p-4 rounded-lg mb-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-600">Jumlah Permintaan:</p>
                                                        <p className="text-2xl font-bold text-blue-600">
                                                            {request.quantity} galon
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">Tanggal Permintaan:</p>
                                                        <p className="font-medium text-gray-800">
                                                            {formatDate(request.requested_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-teal-50 p-3 rounded-lg border border-teal-200 mb-4">
                                                <p className="text-sm text-teal-700">
                                                    ⚠️ <strong>Petunjuk:</strong> Pastikan stok galon tersedia di gudang sebelum menyetujui permintaan. 
                                                    Setelah disetujui, karyawan dapat mengambil galon dan melakukan konfirmasi pengambilan.
                                                </p>
                                            </div>

                                            <div className="flex space-x-2">
                                                <Button
                                                    onClick={() => handleApprove(request.id)}
                                                    disabled={approvingId === request.id}
                                                    className="bg-green-600 hover:bg-green-700 flex-1"
                                                >
                                                    {approvingId === request.id 
                                                        ? '🔄 Memproses...' 
                                                        : `✅ Setujui ${request.quantity} Galon`
                                                    }
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📭</div>
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                        Tidak Ada Permintaan Pending
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        Semua permintaan sudah diproses atau belum ada permintaan baru.
                                    </p>
                                    <Button 
                                        variant="outline"
                                        onClick={() => router.reload()}
                                    >
                                        🔄 Refresh
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Instructions */}
                    <Card className="mt-6 bg-gradient-to-br from-cyan-50 to-blue-100 border-cyan-200">
                        <CardHeader>
                            <CardTitle className="text-cyan-800 flex items-center">
                                <span className="mr-2">💡</span>
                                Panduan Admin Gudang
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-cyan-700">
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start">
                                    <span className="text-lg mr-2">1️⃣</span>
                                    <p>Periksa ketersediaan stok galon di gudang</p>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-lg mr-2">2️⃣</span>
                                    <p>Klik "Setujui" jika stok tersedia</p>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-lg mr-2">3️⃣</span>
                                    <p>Siapkan galon di area pengambilan</p>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-lg mr-2">4️⃣</span>
                                    <p>Monitor halaman "Siap Diambil" untuk tracking</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}