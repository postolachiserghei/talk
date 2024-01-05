<?php
require 'bootstrap.php';

use Illuminate\Database\Capsule\Manager as DB;
use Illuminate\Database\Schema\Blueprint;

try {
    DB::schema()->create('employee', function (Blueprint $table) {
        $table->increments('id')->autoIncrement();
        $table->char('first_name', 50)->nullable(false)->comment('Имя');
        $table->char('last_name', 50)->nullable(false)->comment('Фамилия');
        $table->char('function', 150)->nullable(false)->comment('Должность');
        $table->char('email', 100)
            ->unique()
            ->nullable(false)->comment('Email');
        $table->char('phone', 15)->nullable(false)->comment('Домашний телефон');
        $table->text('note', 50)->nullable(false)->comment('Заметки');
        $table->integer('parent_id')->default(null)->nullable(true)->comment('Начальник');
        $table->index('email');
        $table->index('phone');
        $table->dateTime('created_at');
        $table->dateTime('updated_at');
    });

    DB::schema()->table('employee', function (Blueprint $table) {
        $table->foreign('parent_id')->references('id')->on('employee')
            ->onDelete('set null')
            ->onUpdate('cascade');
    });

} catch (Exception $exception) {
    echo "failed to create table!";
}

try {

    $template = [
        'first_name' => 'F_NAME_',
        'last_name' => 'L_NAME_',
        'function' => 'M_AGENT_',
        'email' => 'E_MAIL_@mail.com',
        'phone' => '+1',
        'note' => 'N_INFO_',
        'parent_id' => null,
    ];

    $dataToInsert = [];

    for ($i = 0; $i <= 5000; $i++) {
        $rand = uniqid('', false);
        $dataToInsert[] = [
            'first_name' => $template['first_name'] . $rand,
            'last_name' => $template['last_name'] . $rand,
            'function' => $template['function'] . $rand,
            'email' => $rand . $i . $template['email'],
            'phone' => $template['phone'] . $rand,
            'note' => $template['note'] . $rand,
            'parent_id' => null,
            'created_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => \Carbon\Carbon::now()->format('Y-m-d H:i:s'),
        ];
    }

    DB::table('employee')->insert($dataToInsert);

} catch (Exception $e) {
    $print = '<pre>' . print_r($e, true) . '</pre>';
    echo $print;
    die();
}
