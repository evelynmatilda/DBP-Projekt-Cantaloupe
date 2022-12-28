<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "../JSON-filer/users.json";
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

$requestJSON = file_get_contents('php://input');
$requestData = json_decode($requestJSON, true);

$username = $_GET["username"];
$password = $_GET["password"];

if(isset($_GET["username"], $_GET["password"])){
    foreach($users as $user){
    if($user["username"] == $username && $user["password"] == $password){
        sendJSON($user);
    }
}
$error = ["error" => "User not found"];
sendJSON($error, 404);
}


?>