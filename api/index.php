<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-type: application/json');
require 'bootstrap.php';

$ec = new Controllers\EmployeeController();

$sentData = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST')
    $sentData = json_decode(file_get_contents("php://input"), true);

$action = @$_GET['action'];
$data = @$sentData['data'];
$page = @$sentData['data']['page'];

$response = ['action' => $action];

switch ($action) {
    case 'list':
        $response['response'] = $ec->dataProvider($page)->getResponse();
        break;
    case 'search':
        $response['response'] = $ec->search(@$sentData['data']['value'])->getResponse();
        break;
    case 'create':
        $response['response'] = $ec->create($data)->getResponse();
        break;
    case 'update':
        $response['response'] = $ec->update($data)->getResponse();
        break;
    case 'delete':
        $response['response'] = $ec->delete(@$sentData['data']['id'])->getResponse();
        break;
    default:
        break;
}

echo json_encode($response);
