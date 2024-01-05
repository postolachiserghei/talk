<?php

namespace Controllers;


class BaserController
{
    protected $data = [];
    public $errors = [];

    public function addData($data)
    {
        $this->data = array_merge($this->data, $data);
    }


    public function addError($text, $key = null)
    {
        $key ? $this->errors[$key] = $text : $this->errors[] = $text;
    }

    public function hasError()
    {
        return count($this->errors) > 0;
    }

    public function getResponse()
    {
        return array_merge($this->data, [
            'status' => (count($this->errors) > 0 ? 'FAIL' : 'OK'),
            'message' => (count($this->errors) > 0 ? implode(', ', $this->errors) : 'Операция прошла успешно!'),
            'errors' => $this->errors
        ]);
    }

}
