<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'full_name' => 'required|min:5|max:25',
            'title' => 'required|in:Mr,Ms,Miss,Mrs',
            'login' => 'required|min:5|unique:App\Models\User,login',
            'email' => 'required|email|unique:App\Models\User,email',
            'password' => 'required|confirmed|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/'
        ];
    }

    public function messages()
    {
        return [
            'full_name.required' => 'First name or surname is missing',
            'full_name.min' => 'First name or surname is too short',
            'full_name.max' => 'First name or surname is too long',
            'title.required' => 'Title is required',
            'title.in' => 'Given title does not match the options',
            'login.required' => 'Login is required',
            'login.min' => 'Login is too short',
            'email.required' => 'Email is required',
            'email.email' => 'Email does not correspond with known examples',
            'password.required' => 'Password is required',
            'password.confirmed' => 'Password does not match with the password repeat',
            'password.regex' => 'Password must contain one lowercase letter, one uppercase letter, one number, one special character. Password has to be at least 8 characters long.' 
        ];
    }
}
