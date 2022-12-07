<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "../JSON-filer/userPlants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "DELETE") {
    $error = ["error" => "Invalid HTTP method! (Only DELETE is allowed)"];
    sendJSON($error, 405);
}

$userPlants = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $userPlants = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if (!isset($requestData["userPlantId"])) {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);   
}

$id = $requestData["userPlantId"];

foreach ($userPlants as $index => $userPlant) {
    if ($userPlant["userPlantId"] == $id) {
        array_splice($userPlants, $index, 1);
        $json = json_encode($userPlants, JSON_PRETTY_PRINT);
        file_put_contents($filename, $json);
        sendJSON($id);
    }
    
}

$error = ["error" => "Plant not found"];
sendJSON($error, 404);
?>