<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "./JSON-filer/plants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "GET") {
    $error = ["error" => "Invalid HTTP method! (Only GET is allowed)"];
    sendJSON($error, 405);
}

$plants = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $plants = json_decode($json, true);
}

if (isset($_GET["plantId"])) {
    $id = $_GET["plantId"];

    foreach ($plants as $plant) {
        if ($plant["plantId"] == $id) {
            sendJSON($plant);
        }
    }

    $error = ["error" => "Plant not found"];
    sendJSON($error, 404);
}

sendJSON($plants);

?>