<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserEditRequest extends FormRequest
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
            'image' => 'image:jpg,png,jpeg',
            'full_name' => 'regex:/^[a-zA-Z]+( [a-zA-Z]+)*$/|max:30',
            'title' => 'in:Mr,Ms,Miss,Mrs',
            'email' => 'email|unique:App\Models\User,email,'.$this->id,
            'description' => 'string|max:255',
            'login' => 'min:5|unique:App\Models\User,login',
            'status' => 'in:available,unavailable,'
        ];
    }

    public function messages()
    {
        return [
            'image.image' => 'Image types are not supported',
            'full_name.alpha' => 'Name or surname contains invalid characters',
            'title.in' => 'Title does not exist',
            'email.email' => 'Email does not correspond with known examples',
            'email.unique' => 'Email is already taken',
            'description.string' => 'Description contains invalid characters',
            'description.max' => 'Description is too long',
            'login.min' => 'Login is too short',
            'login.unique' => 'Login is already taken',
            'status.in' => 'Status does not exist',
        ];
    }
    public function validateResolved()
    {
        return ;
    }
}
