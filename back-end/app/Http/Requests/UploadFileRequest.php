<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UploadFileRequest extends FormRequest
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
            'file' => [
                'required',
                // File::types(['txt']),
            ],
            'project_id' => 'required',
            'file_title' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'file.required' => 'File is missing',
            // 'file.file' => 'Unsupported file extension',
            'project_id.required' => 'Project id is missing',
            'file_title.required' => 'Title is missing',
        ];
    }

    public function validateResolved()
    {
        return ;
    }
}
