<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PersonalMessageReplyRequest extends FormRequest
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
            'reply_target' => 'required',
            'author' => 'required',
            'content' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'reply_target.required' => 'Message target is missing',
            'author.required' => 'Author is missing',
            'content.required' => 'Content is missing',
        ];
    }

    public function validateResolved()
    {
        return;
    }
}
