<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendProjectMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'project_id' => 'required',
            'content' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'project_id.required' => 'Team id is missing',
            'content.required' => 'Message is missing',
        ];
    }

    public function validateResolved()
    {
        return;
    }
}
