<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "users.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "GET") {
    $error = ["error" => "Invalid HTTP method! (Only GET is allowed)"];
    sendJSON($error, 405);
}

$users = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $users = json_decode($json, true);
}

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    foreach ($users as $user) {
        if ($user["id"] == $id) {
            sendJSON($user);
        }
    }

    $error = ["error" => "User not found"];
    sendJSON($error, 404);
}

sendJSON($users);

?>