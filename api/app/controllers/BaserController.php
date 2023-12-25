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


    public function addError($text)
    {
        $this->errors[] = $text;
    }

    public function getResponse()
    {
        return array_merge($this->data, [
            'status' => (count($this->errors) > 0 ? 'FAIL' : 'OK')
        ]);
    }

}
