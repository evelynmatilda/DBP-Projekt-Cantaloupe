<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "/JSON-filer/users.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "POST") {
    $error = ["error" => "Invalid HTTP method! (Only POST is allowed)"];
    sendJSON($error, 405);
}

$users = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $users = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if (!isset($requestData["username"], $requestData["password"], $requestData["email"])) {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

$username = $requestData["username"];
$password = $requestData["password"];
$email = $requestData["email"];
$owns = $requestData["owns"];

if ($username == "" or $password == "" or $email == "") {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

$highestId = 0;
foreach ($users as $user) {
    if ($user["userId"] > $highestId) {
        $highestId = $user["userId"];
    }
}

$nextId = $highestId + 1;

$newUser = ["userId" => $nextId, "username" => $username, "password" => $password, "email" => $email, "owns" => $owns];
$users[] = $newUser;
$json = json_encode($users, JSON_PRETTY_PRINT);
file_put_contents($filename, $json);

sendJSON($newUser);

?>