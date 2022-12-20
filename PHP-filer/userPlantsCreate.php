<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "../JSON-filer/userPlants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "POST") {
    $error = ["error" => "Invalid HTTP method! (Only POST is allowed)"];
    sendJSON($error, 405);
}

$userPlants = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $userPlants = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if (!isset($requestData["userId"], $requestData["plantId"])) {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

$userId = $requestData["userId"];
$plantId = $requestData["plantId"];


if ($userId == 0 or $plantId == 0) {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

$highestId = 0;
foreach ($userPlants as $userPlant) {
    if ($userPlant["userPlantId"] > $highestId) {
        $highestId = $userPlant["userPlantId"];
    }
}

$nextId = $highestId + 1;

$newUserPlant = ["userPlantId" => $nextId, "userId" => $userId, "plantId" => $plantId, "water" => [], "bugs" => false];
$userPlants[] = $newUserPlant;
$json = json_encode($userPlants, JSON_PRETTY_PRINT);
file_put_contents($filename, $json);

sendJSON($newUserPlant);

?>