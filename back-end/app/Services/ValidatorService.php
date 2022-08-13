<?php

namespace App\Services;

use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class ValidatorService {
    public const SUCCESS = 'success';
    public const ERROR = 'error';

    public function __construct(private object $request)
    {}

    public function validate(): object
    {
        $validator = Validator::make($this->request->all(), $this->request->rules(),$this->request->messages());
        if ($validator->errors()->any()) {
            return (object)[
                'status'=>self::ERROR,
                'data'=>(object)$validator->errors()->all()
            ];
        }
        return (object)[
            'status'=>self::SUCCESS,
            'data'=>(object)$validator->safe()->all()
        ];
    }
}