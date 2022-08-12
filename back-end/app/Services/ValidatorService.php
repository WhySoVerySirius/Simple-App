<?php

namespace App\Services;

use Illuminate\Support\Facades\Validator;

class ValidatorService {
    public function __construct(private $request)
    {}

    public function validate(): object
    {
        $validator = Validator::make($this->request->all(), $this->request->rules(),$this->request->messages());
        if ($validator->errors()->any()) {
            return (object)[
                'status'=>'error',
                'data'=>(object)$validator->errors()->all()
            ];
        }
        return (object)[
            'status'=>'success',
            'data'=>(object)$validator->safe()->all()
        ];
    }
}