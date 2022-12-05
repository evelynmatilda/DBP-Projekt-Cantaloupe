<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "plants.json";
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

if (!isset($requestData["name"], $requestData["latin"], $requestData["flowers"])) {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

$name = $requestData["name"];
$latin = $requestData["latin"];
$flowers = $requestData["flowers"];

if ($name == "" or $latin == "" or $flowers == "") {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

$highestId = 0;
foreach ($plants as $plant) {
    if ($plant["id"] > $highestId) {
        $highestId = $plant["id"];
    }
}

$nextId = $highestId + 1;

$newPlant = ["id" => $nextId, "name" => $name, "latin" => $latin, "flowers" => $flowers];
$plants[] = $newPlant;
$json = json_encode($plants, JSON_PRETTY_PRINT);
file_put_contents($filename, $json);

sendJSON($newPlant);

?>