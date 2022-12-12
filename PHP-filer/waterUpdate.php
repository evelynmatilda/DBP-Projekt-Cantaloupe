<?php 
ini_set("display_errors", 1);

require_once "functions.php";

$filename = "../JSON-filer/userPlants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "POST") {
   $error = ["error" => "Invalid HTTP method! (Only POST is allowed)"];
   sendJSON($error, 405);
}

$plantWaters = [];

if (file_exists($filename)) {
   $json = file_get_contents($filename);
   $plantWaters = json_decode($json, true);
}

$requestJSON = file_get_contents('php://input');
$requestData = json_decode($requestJSON, true);

date_default_timezone_set("Europe/Stockholm");
$waterDate = date("Y-m-d");

$id = $requestData["userPlantId"];
$newWater = $waterDate;

if ($newWater == "") {
   $error = ["error" => "Bad Request!"];
   sendJSON($error, 400);
}

foreach ($plantWaters as $index => $plantWater) {
   if ($plantWater["userPlantId"] == $id) {
      $waters = $plantWater["water"];
      $waters[] = $newWater;
      $plantWater["water"] = $waters;
      $plantWaters[$index] = $plantWater;

      $json = json_encode($plantWaters, JSON_PRETTY_PRINT);
      file_put_contents($filename, $json);
      sendJSON($plantWater);
      }
}

$error = ["error" => "Plant not found"];
sendJSON($error, 404);


?>