<?php
namespace Models;
use Illuminate\Database\Capsule\Manager as Capsule;

class Database {
    public function __construct()
    {
        $conf = [
            'port' => DBPORT,
            'driver' => DBDRIVER,
            'host' => DBHOST,
            'database' => DBNAME,
            'username' => DBUSER,
            'password' => DBPASS,
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
        ];
        $capsule = new Capsule;
        $capsule->addConnection($conf);
        $capsule->setAsGlobal();
        $capsule->bootEloquent();

        try {
            $capsule->getConnection()->getPdo();
        } catch (\Exception $e) {
            die("Could not connect to the database. Error: " . $e->getMessage());
        }

    }
}
