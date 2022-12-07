<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "userPlants.json";
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

if (!isset($requestData["userId"], $requestData["plantId"], $requestData["water"], $requestData["bugs"])) {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

$userId = $requestData["userId"];
$plantId = $requestData["plantId"];
$water = $requestData["water"];
$bugs = $requestData["bugs"];

if ($userId == "" or $plantId == "" or $water == "" or $bugs == "") {
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

$newUserPlant = ["userPlantId" => $nextId, "userId" => $userId, "plantId" => $plantId, "water" => $water, $bugs => "bugs"];
$userPlants[] = $newUserPlant;
$json = json_encode($userPlants, JSON_PRETTY_PRINT);
file_put_contents($filename, $json);

sendJSON($newUserPlants);

?>