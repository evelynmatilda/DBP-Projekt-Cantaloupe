<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "../JSON-filer/users.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "PATCH") {
    $error = ["error" => "Invalid HTTP method! (Only PATCH is allowed)"];
    sendJSON($error, 405);
}

$users = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $users = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if (!isset($requestData["id"], $requestData["email"])) {
    $error = ["error" => "Bad Request! yesy"];
    sendJSON($error, 400);
}

$id = $requestData["id"];
$newEmail = $requestData["email"];

if ($newEmail == "") {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

foreach ($users as $index => $user) {
    if ($user["userId"] == $id) {
        $user["email"] = $newEmail;
        $users[$index] = $user;
        $json = json_encode($users, JSON_PRETTY_PRINT);
        file_put_contents($filename, $json);
        sendJSON($user);
    }
}

$error = ["error" => "User not found"];
sendJSON($error, 404);

?>