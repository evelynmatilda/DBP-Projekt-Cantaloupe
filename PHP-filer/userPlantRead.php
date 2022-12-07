<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "../JSON-filer/userPlants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "GET") {
    $error = ["error" => "Invalid HTTP method! (Only GET is allowed)"];
    sendJSON($error, 405);
}

$userPlants = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $plants = json_decode($json, true);
}

if (isset($_GET["userPlantId"])) {
    $id = $_GET["userPlantId"];

    foreach ($userPlants as $userPlant) {
        if ($userPlant["userPlantId"] == $id) {
            sendJSON($userPlant);
        }
    }

    $error = ["error" => "Plant not found"];
    sendJSON($error, 404);
}

sendJSON($userPlants);

?>