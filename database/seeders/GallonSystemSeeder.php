<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\GallonRequest;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class GallonSystemSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create admin users
        User::create([
            'name' => 'HR Admin',
            'email' => 'hr@company.com',
            'password' => Hash::make('password'),
            'role' => 'admin_hr',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Administrator',
            'email' => 'admin@company.com',
            'password' => Hash::make('password'),
            'role' => 'admin_administrator',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Gudang Admin',
            'email' => 'gudang@company.com',
            'password' => Hash::make('password'),
            'role' => 'admin_gudang',
            'email_verified_at' => now(),
        ]);

        // Create sample employees
        $employees = [
            ['employee_id' => 'EMP001', 'name' => 'Ahmad Reza', 'department' => 'IT', 'grade' => 'G7'],
            ['employee_id' => 'EMP002', 'name' => 'Siti Aminah', 'department' => 'HR', 'grade' => 'G8'],
            ['employee_id' => 'EMP003', 'name' => 'Budi Santoso', 'department' => 'Finance', 'grade' => 'G9'],
            ['employee_id' => 'EMP004', 'name' => 'Lisa Permata', 'department' => 'Operations', 'grade' => 'G10'],
            ['employee_id' => 'EMP005', 'name' => 'Dedi Kurniawan', 'department' => 'Marketing', 'grade' => 'G11'],
            ['employee_id' => 'EMP006', 'name' => 'Maya Indira', 'department' => 'IT', 'grade' => 'G12'],
            ['employee_id' => 'EMP007', 'name' => 'Rizki Pratama', 'department' => 'HR', 'grade' => 'G13'],
            ['employee_id' => 'EMP008', 'name' => 'Dewi Lestari', 'department' => 'Finance', 'grade' => 'G7'],
        ];

        foreach ($employees as $employeeData) {
            $employee = Employee::create($employeeData);

            // Create some sample requests for demonstration
            if (in_array($employee->employee_id, ['EMP001', 'EMP002', 'EMP003'])) {
                // Create collected requests (previous months)
                GallonRequest::create([
                    'employee_id' => $employee->id,
                    'quantity' => random_int(2, 5),
                    'status' => 'collected',
                    'requested_at' => now()->subMonths(1)->subDays(random_int(1, 20)),
                    'approved_at' => now()->subMonths(1)->subDays(random_int(1, 15)),
                    'collected_at' => now()->subMonths(1)->subDays(random_int(1, 10)),
                    'month' => now()->subMonths(1)->month,
                    'year' => now()->subMonths(1)->year,
                ]);

                // Create current month requests with different statuses
                if ($employee->employee_id === 'EMP001') {
                    // Pending request
                    GallonRequest::create([
                        'employee_id' => $employee->id,
                        'quantity' => 3,
                        'status' => 'pending',
                        'requested_at' => now()->subDays(2),
                        'month' => now()->month,
                        'year' => now()->year,
                    ]);
                }

                if ($employee->employee_id === 'EMP002') {
                    // Approved request ready for collection
                    GallonRequest::create([
                        'employee_id' => $employee->id,
                        'quantity' => 4,
                        'status' => 'approved_warehouse',
                        'requested_at' => now()->subDays(3),
                        'approved_at' => now()->subDays(1),
                        'month' => now()->month,
                        'year' => now()->year,
                    ]);
                }

                if ($employee->employee_id === 'EMP003') {
                    // Already collected this month
                    GallonRequest::create([
                        'employee_id' => $employee->id,
                        'quantity' => 2,
                        'status' => 'collected',
                        'requested_at' => now()->subDays(5),
                        'approved_at' => now()->subDays(3),
                        'collected_at' => now()->subDays(2),
                        'month' => now()->month,
                        'year' => now()->year,
                    ]);
                }
            }
        }
    }
}