<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "../JSON-filer/plants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "POST") {
    $error = ["error" => "Invalid HTTP method! (Only POST is allowed)"];
    sendJSON($error, 405);
}

$plants = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $plants = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if (!isset($requestData["name"], $requestData["latin"], $requestData["info"], $requestData["waterInt"], $requestData["flowers"], $requestData["sun"])) {
    $error = ["error" => "Bad Request! Missing data"];
    sendJSON($error, 400);
}

$name = $requestData["name"];
$latin = $requestData["latin"];
$info = $requestData["info"];
$waterInt = $requestData["waterInt"];
$flowers = $requestData["flowers"];
$sun = $requestData["sun"];

if ($name == "" or $latin == "" or $info == "") {
    $error = ["error" => "Bad Request! You need to fill in all fields"];
    sendJSON($error, 400);
}

$highestId = 0;
foreach ($plants as $plant) {
    if ($plant["plantId"] > $highestId) {
        $highestId = $plant["plantId"];
    }
}

$nextId = $highestId + 1;

$newPlant = ["plantId" => $nextId, "name" => $name, "latin" => $latin, "info" => $info, "waterInt" => $waterInt, "flowers" => $flowers, "sun" => $sun, "img" => "No picture exist for this plant"];
$plants[] = $newPlant;
$json = json_encode($plants, JSON_PRETTY_PRINT);
file_put_contents($filename, $json);

sendJSON($newPlant);

?>