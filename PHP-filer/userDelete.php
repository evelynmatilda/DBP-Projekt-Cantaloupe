<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "users.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "DELETE") {
    $error = ["error" => "Invalid HTTP method! (Only DELETE is allowed)"];
    sendJSON($error, 405);
}

$users = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $users = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if (!isset($requestData["id"])) {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

$id = $requestData["id"];

foreach ($users as $index => $user) {
    if ($user["id"] == $id) {
        array_splice($users, $index, 1);
        $json = json_encode($users, JSON_PRETTY_PRINT);
        file_put_contents($filename, $json);
        sendJSON($id);
    }
    
}

$error = ["error" => "User not found"];
sendJSON($error, 404);
?>