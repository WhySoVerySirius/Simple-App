<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetTeamMessagesRequest extends FormRequest
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
            'team_id' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'team_id.required' => 'Team id is missing',
        ];
    }

    public function validateResolved()
    {
        return;
    }
}
