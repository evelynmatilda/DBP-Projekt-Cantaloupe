<?php
// vet inte om vi behöver denna? dem enda som ska kunna ta bort växter från officiella databasen är vi?

ini_set("display_errors", 1);

require_once "functions.php";

$filename = "../JSON-filer/plants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "DELETE") {
    $error = ["error" => "Invalid HTTP method! (Only DELETE is allowed)"];
    sendJSON($error, 405);
}

$plants = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $plants = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if (!isset($requestData["plantId"])) {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);   
}

$id = $requestData["plantId"];

foreach ($plants as $index => $plant) {
    if ($plant["plantId"] == $id) {
        array_splice($plants, $index, 1);
        $json = json_encode($plants, JSON_PRETTY_PRINT);
        file_put_contents($filename, $json);
        sendJSON($id);
    }
    
}

$error = ["error" => "Plant not found"];
sendJSON($error, 404);
?>