<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadLinkRequest extends FormRequest
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
            'file' => 'required',
            'project_id' => 'required',
            'repo' => 'required|in:local,github,dockerhub',
        ];
    }

    public function messages()
    {
        return [
            'file.required' => 'Link is missing',
            'project_id.required' => 'Project id is missing',
            'repo.required' => 'Repository is missing',
            'repo.in' => 'Unsupported repository type',
        ];
    }

    public function validateResolved()
    {
        return;
    }
}
