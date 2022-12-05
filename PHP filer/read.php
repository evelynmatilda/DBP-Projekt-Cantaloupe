<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "plants.json";
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

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    foreach ($plants as $plant) {
        if ($plant["id"] == $id) {
            sendJSON($plant);
        }
    }

    $error = ["error" => "plant not found"];
    sendJSON($error, 404);
}

sendJSON($plants);

?>