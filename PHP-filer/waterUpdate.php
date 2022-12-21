<?php 
require_once "functions.php";

$filename = "../JSON-filer/userPlants.json";
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

foreach ($plants as $index => $plant) {
   if ($plant["userPlantId"] == $id) {
      $waters = $plant["water"];
      $waters[] = $newWater;
      $plant["water"] = $waters;
      $plants[$index] = $plant;

      $json = json_encode($plants, JSON_PRETTY_PRINT);
      file_put_contents($filename, $json);
      sendJSON($plant);
      }
}

$error = ["error" => "Plant not found"];
sendJSON($error, 404);


?>