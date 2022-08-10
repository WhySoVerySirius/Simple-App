<?php

namespace App\Services;

use Illuminate\Support\Facades\Validator;

class ValidatorService {
    public function __construct(private $request)
    {}

    public function validate(): array
    {
        $validator = Validator::make($this->request->all(), $this->request->rules(),$this->request->messages());
        if ($validator->errors()->any()) {
            return [
                'status'=>'error',
                'data'=>$validator->errors()->all()
            ];
        }
        return [
            'status'=>'success',
            'data'=>$validator->safe()->all()
        ];
    }
}