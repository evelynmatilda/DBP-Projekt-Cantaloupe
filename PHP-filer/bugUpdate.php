<?php 
ini_set(display errors, 1);

require_once "functions.php";

// nå den växtens id för att nå den växtens objekt→nyckel för anteckningar
// så kolla id:t → if sats?
// måste nå userns id och sedan växtens id

$filename = "../JSON-filer/userPlants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "PATCH") {
   $error = ["error" => "Invalid HTTP method! (Only PATCH is allowed)"];
   sendJSON($error, 405);
}

$plantBugs = [];

if (file_exists($filename)) {
   $json = file_get_contents($filename);
   $plants = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if (!isset($requestData["id"], $requestData["bug"])) {
   $error = ["error" => "Bad Request!"];
   sendJSON($error, 400);
}

$id = $requestData["userPlantId"];
$bugs = $requestData["bugs"];

if ($bugs == "") {
   $error = ["error" => "Bad Request!"];
   sendJSON($error, 400);
}

foreach ($plantBugs as $index => $plantBug) {
   if ($plantBug["userPlantId"] == $id) {
       $plantBug["bugs"] = $bugs;

       $json = json_encode($plantBugs, JSON_PRETTY_PRINT);
       file_put_contents($filename, $json);
       sendJSON($plantBug);
   }
}

$error = ["error" => "Plant not found"];
sendJSON($error, 404);


?>