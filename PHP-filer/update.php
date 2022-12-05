<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "plants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "PUT") {
    $error = ["error" => "Invalid HTTP method! (Only PUT is allowed)"];
    sendJSON($error, 405);
}

$plants = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $plants = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if (!isset($requestData["id"], $requestData["name"], $requestData["latin"], $requestData["flowers"])) {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

$id = $requestData["id"];
$newName = $requestData["name"];
$newLatin = $requestData["latin"];
$newFlowers = $requestData["flowers"];

if ($newName == "" or $newLatin == "" or $newFlowers == "") {
    $error = ["error" => "Bad Request!"];
    sendJSON($error, 400);
}

foreach ($plants as $index => $plant) {
    if ($plant["id"] == $id) {
        $plant["name"] = $newName;
        $plant["latin"] = $newLatin;
        $plant["flowers"] = $newFlowers;
        $plants[$index] = $plant;

        $json = json_encode($plants, JSON_PRETTY_PRINT);
        file_put_contents($filename, $json);
        sendJSON($plant);
    }
}

$error = ["error" => "Plant not found"];
sendJSON($error, 404);

?>