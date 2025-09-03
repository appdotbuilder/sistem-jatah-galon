import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    is_active: boolean;
    monthly_quota: number;
}

interface Props {
    employees: {
        data: Employee[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    [key: string]: unknown;
}

export default function EmployeeIndex({ employees }: Props) {
    return (
        <>
            <Head title="Kelola Karyawan - Admin HR" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    👥 Kelola Karyawan
                                </h1>
                                <p className="text-gray-600">
                                    Manajemen data karyawan dan kuota galon
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <Link href="/employees/create">
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        ➕ Tambah Karyawan
                                    </Button>
                                </Link>
                                <Link href="/dashboard">
                                    <Button variant="outline">
                                        🏠 Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Employee List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📋 Daftar Karyawan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {employees.data.length > 0 ? (
                                <div className="space-y-4">
                                    {employees.data.map((employee) => (
                                        <div key={employee.id} className="border rounded-lg p-4 bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {employee.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        ID: {employee.employee_id} • 
                                                        Dept: {employee.department} • 
                                                        Grade: {employee.grade}
                                                    </p>
                                                    <p className="text-sm text-blue-600">
                                                        Kuota: {employee.monthly_quota} galon/bulan
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    {employee.is_active ? (
                                                        <Badge className="bg-green-100 text-green-800">
                                                            Aktif
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="bg-red-100 text-red-800">
                                                            Non-Aktif
                                                        </Badge>
                                                    )}
                                                    <div className="space-x-2">
                                                        <Link href={`/employees/${employee.id}`}>
                                                            <Button variant="outline" size="sm">
                                                                👁️ Detail
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/employees/${employee.id}/edit`}>
                                                            <Button variant="outline" size="sm">
                                                                ✏️ Edit
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">👥</div>
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                        Belum ada karyawan
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        Tambahkan karyawan pertama untuk memulai.
                                    </p>
                                    <Link href="/employees/create">
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            ➕ Tambah Karyawan Pertama
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pagination */}
                    {employees.data.length > 0 && employees.links.length > 3 && (
                        <div className="mt-6 flex justify-center">
                            <div className="flex space-x-2">
                                {employees.links.map((link, index) => (
                                    <div key={index}>
                                        {link.url ? (
                                            <Link href={link.url}>
                                                <Button
                                                    variant={link.active ? "default" : "outline"}
                                                    size="sm"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            </Link>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}