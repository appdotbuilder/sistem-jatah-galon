import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EmployeeFormData {
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    is_active: boolean;
    [key: string]: unknown;
}

export default function CreateEmployee() {
    const [data, setData] = useState<EmployeeFormData>({
        employee_id: '',
        name: '',
        department: '',
        grade: 'G7',
        is_active: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post('/employees', {
            employee_id: data.employee_id,
            name: data.name,
            department: data.department,
            grade: data.grade,
            is_active: data.is_active,
        }, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const gradeOptions = ['G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13'];
    const departments = ['HR', 'IT', 'Finance', 'Operations', 'Marketing', 'Production', 'Admin'];

    const getQuotaForGrade = (grade: string) => {
        switch (grade) {
            case 'G7':
            case 'G8':
                return 24;
            case 'G9':
                return 12;
            case 'G10':
                return 10;
            case 'G11':
            case 'G12':
            case 'G13':
                return 7;
            default:
                return 0;
        }
    };

    return (
        <>
            <Head title="Tambah Karyawan - Admin HR" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    ➕ Tambah Karyawan Baru
                                </h1>
                                <p className="text-gray-600">
                                    Isi form di bawah untuk menambah karyawan baru
                                </p>
                            </div>
                            <Button 
                                variant="outline"
                                onClick={() => router.get('/employees')}
                            >
                                🔙 Kembali
                            </Button>
                        </div>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle>📝 Formulir Data Karyawan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Employee ID */}
                                    <div>
                                        <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700 mb-2">
                                            ID Karyawan <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="employee_id"
                                            type="text"
                                            value={data.employee_id}
                                            onChange={(e) => setData({...data, employee_id: e.target.value})}
                                            placeholder="Contoh: EMP001"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            ID unik untuk karyawan, akan digunakan untuk scan
                                        </p>
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData({...data, name: e.target.value})}
                                            placeholder="Nama lengkap karyawan"
                                            required
                                        />
                                    </div>

                                    {/* Department */}
                                    <div>
                                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                                            Departemen <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="department"
                                            value={data.department}
                                            onChange={(e) => setData({...data, department: e.target.value})}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            required
                                        >
                                            <option value="">Pilih Departemen</option>
                                            {departments.map(dept => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Grade */}
                                    <div>
                                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                                            Grade <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="grade"
                                            value={data.grade}
                                            onChange={(e) => setData({...data, grade: e.target.value})}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            required
                                        >
                                            {gradeOptions.map(grade => (
                                                <option key={grade} value={grade}>
                                                    {grade} - {getQuotaForGrade(grade)} galon/bulan
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Grade menentukan kuota bulanan galon
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={data.is_active}
                                                onChange={(e) => setData({...data, is_active: e.target.checked})}
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                Karyawan Aktif
                                            </span>
                                        </label>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Hanya karyawan aktif yang bisa mengajukan permintaan galon
                                        </p>
                                    </div>

                                    {/* Quota Info */}
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h4 className="font-medium text-blue-800 mb-2">
                                            📊 Informasi Kuota
                                        </h4>
                                        <p className="text-sm text-blue-700">
                                            Grade {data.grade}: <strong>{getQuotaForGrade(data.grade)} galon per bulan</strong>
                                        </p>
                                        <p className="text-xs text-blue-600 mt-1">
                                            Kuota akan direset otomatis setiap tanggal 1
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex space-x-4">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 bg-green-600 hover:bg-green-700"
                                        >
                                            {isSubmitting ? '🔄 Menyimpan...' : '💾 Simpan Karyawan'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => router.get('/employees')}
                                            disabled={isSubmitting}
                                        >
                                            ❌ Batal
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}