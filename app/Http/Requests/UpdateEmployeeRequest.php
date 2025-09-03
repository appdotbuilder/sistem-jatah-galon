<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isHRAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $employeeId = $this->route('employee')->id;
        
        return [
            'employee_id' => 'required|string|unique:employees,employee_id,' . $employeeId . '|max:20',
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'grade' => 'required|in:G7,G8,G9,G10,G11,G12,G13',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'employee_id.required' => 'Employee ID is required.',
            'employee_id.unique' => 'This Employee ID is already taken by another employee.',
            'name.required' => 'Employee name is required.',
            'department.required' => 'Department is required.',
            'grade.required' => 'Grade is required.',
            'grade.in' => 'Grade must be one of: G7, G8, G9, G10, G11, G12, G13.',
        ];
    }
}