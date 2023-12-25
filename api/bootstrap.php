<?php
error_reporting(E_ERROR);
require './config.php';
require './vendor/autoload.php';

use Models\Database;

new Database();

