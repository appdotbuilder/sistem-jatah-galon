<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GallonRequest>
 */
class GallonRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $requestedAt = fake()->dateTimeBetween('-3 months', 'now');
        
        return [
            'employee_id' => Employee::factory(),
            'quantity' => fake()->numberBetween(1, 5),
            'status' => fake()->randomElement(['pending', 'approved_warehouse', 'collected']),
            'requested_at' => $requestedAt,
            'month' => $requestedAt->format('n'),
            'year' => $requestedAt->format('Y'),
        ];
    }

    /**
     * Indicate that the request is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'approved_at' => null,
            'collected_at' => null,
        ]);
    }

    /**
     * Indicate that the request is approved by warehouse.
     */
    public function approvedWarehouse(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved_warehouse',
            'approved_at' => fake()->dateTimeBetween($attributes['requested_at'], 'now'),
            'collected_at' => null,
        ]);
    }

    /**
     * Indicate that the request is collected.
     */
    public function collected(): static
    {
        $approvedAt = fake()->dateTimeBetween($this->definition()['requested_at'], 'now');
        
        return $this->state(fn (array $attributes) => [
            'status' => 'collected',
            'approved_at' => $approvedAt,
            'collected_at' => fake()->dateTimeBetween($approvedAt, 'now'),
        ]);
    }

    /**
     * Set request for current month.
     */
    public function currentMonth(): static
    {
        return $this->state(fn (array $attributes) => [
            'month' => now()->month,
            'year' => now()->year,
            'requested_at' => fake()->dateTimeBetween('first day of this month', 'now'),
        ]);
    }
}