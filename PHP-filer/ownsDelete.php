<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "../JSON-filer/users.json";
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

if (!isset($requestData["userId"])) {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

$id = $requestData["userId"];
$plantId = $requestData["userPlantId"];

foreach ($users as $userIndex => $user) {
    if ($user["userId"] == $id) {
        $owns = $user["owns"];
        foreach ($owns as $index => $own) {
            if ($own == $plantId) {
                array_splice($owns, $index, 1);
                $user["owns"] = $owns;
                $users[$userIndex] = $user; 
                $json = json_encode($users, JSON_PRETTY_PRINT);
                file_put_contents($filename, $json);
                sendJSON($own);
            }
        }
    }
}

$error = ["error" => "User not found"];
sendJSON($error, 404);
?>