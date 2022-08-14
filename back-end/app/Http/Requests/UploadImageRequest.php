<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadImageRequest extends FormRequest
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
            'file' => 'required|image',
            'id' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'file.required' => 'File is missing',
            'file.image' => 'Image type is not supported',
            'id.required' => 'Id is missing',
        ];
    }

    public function validateResolved()
    {
        return;
    }
}
