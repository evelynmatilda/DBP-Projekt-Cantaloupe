<?php 

// ini_set("display errors", 1);
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require_once "functions.php";

$filename = "../JSON-filer/userPlants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "PATCH") {
   $error = ["error" => "Invalid HTTP method! (Only PATCH is allowed)"];
   sendJSON($error, 405);
}

$plantBugs = [];

if (file_exists($filename)) {
   $json = file_get_contents($filename);
   $plantBugs = json_decode($json, true);
}

$requestJSON = file_get_contents('php://input');
$requestData = json_decode($requestJSON, true);

$id = $requestData["userPlantId"];
$newBugs = $requestData["bugs"];


if ($newBugs === "") {
   $error = ["error" => "Bad Request!"];
   sendJSON($error, 400);
}

foreach ($plantBugs as $index => $plantBug) {

   if ($plantBug["userPlantId"] == $id) {

       $plantBug["bugs"] = $newBugs;
       $plantBugs[$index] = $plantBug;

       $json = json_encode($plantBugs, JSON_PRETTY_PRINT);
       file_put_contents($filename, $json);
       sendJSON($plantBug);
   }
}

$error = ["error" => "Plant not found"];
sendJSON($error, 404);


?>