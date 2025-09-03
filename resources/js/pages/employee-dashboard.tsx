import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    monthly_quota: number;
    current_month_used: number;
    remaining_quota: number;
}

interface GallonRequest {
    id: number;
    quantity: number;
    status: string;
    requested_at: string;
    approved_at?: string;
    collected_at?: string;
}

interface Props {
    employee: Employee;
    historicalRecords: GallonRequest[];
    pendingRequests: GallonRequest[];
    [key: string]: unknown;
}

export default function EmployeeDashboard({ employee, historicalRecords, pendingRequests }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (quantity < 1 || quantity > employee.remaining_quota) return;

        setIsSubmitting(true);
        router.post(route('gallon.request'), {
            employee_id: employee.employee_id,
            quantity: quantity
        }, {
            onFinish: () => setIsSubmitting(false),
            preserveState: true,
            preserveScroll: true
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
            approved_warehouse: { label: 'Siap Diambil', className: 'bg-blue-100 text-blue-800' },
            collected: { label: 'Selesai', className: 'bg-green-100 text-green-800' }
        };
        const config = statusConfig[status as keyof typeof statusConfig] || { label: status, className: 'bg-gray-100 text-gray-800' };
        return <Badge className={config.className}>{config.label}</Badge>;
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
            <Head title={`Dashboard - ${employee.name}`} />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header with Employee Info */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    👨‍💼 {employee.name}
                                </h1>
                                <p className="text-gray-600">
                                    {employee.employee_id} • {employee.department} • Grade {employee.grade}
                                </p>
                            </div>
                            <Button 
                                variant="outline"
                                onClick={() => router.get('/')}
                            >
                                🏠 Beranda
                            </Button>
                        </div>

                        {/* Quota Overview */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <h3 className="text-sm font-medium text-blue-800">Kuota Bulanan</h3>
                                <p className="text-2xl font-bold text-blue-900">{employee.monthly_quota}</p>
                                <p className="text-xs text-blue-600">galon per bulan</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                <h3 className="text-sm font-medium text-red-800">Sudah Digunakan</h3>
                                <p className="text-2xl font-bold text-red-900">{employee.current_month_used}</p>
                                <p className="text-xs text-red-600">galon bulan ini</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <h3 className="text-sm font-medium text-green-800">Sisa Kuota</h3>
                                <p className="text-2xl font-bold text-green-900">{employee.remaining_quota}</p>
                                <p className="text-xs text-green-600">galon tersisa</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Request Form */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <span className="mr-2">📝</span>
                                        Ajukan Permintaan Galon
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {employee.remaining_quota > 0 ? (
                                        <form onSubmit={handleRequest} className="space-y-4">
                                            <div>
                                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Jumlah Galon
                                                </label>
                                                <Input
                                                    id="quantity"
                                                    type="number"
                                                    min="1"
                                                    max={employee.remaining_quota}
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                                    className="text-center"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Maksimal {employee.remaining_quota} galon
                                                </p>
                                            </div>
                                            <Button
                                                type="submit"
                                                className="w-full bg-green-600 hover:bg-green-700"
                                                disabled={isSubmitting || quantity < 1 || quantity > employee.remaining_quota}
                                            >
                                                {isSubmitting ? '🔄 Mengirim...' : `🚀 Ajukan ${quantity} Galon`}
                                            </Button>
                                        </form>
                                    ) : (
                                        <div className="text-center p-6">
                                            <div className="text-4xl mb-4">⚠️</div>
                                            <h3 className="text-lg font-semibold text-red-600 mb-2">
                                                Kuota Habis
                                            </h3>
                                            <p className="text-gray-600">
                                                Kuota bulan ini sudah habis. Kuota akan direset pada bulan depan.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Pending Requests */}
                            {pendingRequests.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <span className="mr-2">⏳</span>
                                            Permintaan Tertunda
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {pendingRequests.map((request) => (
                                                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div>
                                                        <p className="font-medium">{request.quantity} galon</p>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(request.requested_at)}
                                                        </p>
                                                    </div>
                                                    {getStatusBadge(request.status)}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Historical Records */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">📜</span>
                                    Riwayat Pengambilan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {historicalRecords.length > 0 ? (
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {historicalRecords.map((record) => (
                                            <div key={record.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                                <div>
                                                    <p className="font-medium text-green-800">{record.quantity} galon</p>
                                                    <p className="text-xs text-green-600">
                                                        Diambil: {record.collected_at ? formatDate(record.collected_at) : '-'}
                                                    </p>
                                                </div>
                                                <Badge className="bg-green-100 text-green-800">
                                                    ✅ Selesai
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">📭</div>
                                        <p className="text-gray-500">Belum ada riwayat pengambilan</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 text-center space-x-4">
                        <Button
                            variant="outline"
                            onClick={() => router.post(route('employee.verify'), { employee_id: employee.employee_id })}
                        >
                            ✅ Verifikasi Pengambilan
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
        </>
    );
}