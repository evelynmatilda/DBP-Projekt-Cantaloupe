<?php 
ini_set(display errors, 1);

require_once "functions.php";

// nå den växtens id för att nå den växtens objekt→nyckel för anteckningar
// så kolla id:t → if sats?
// måste nå userns id och sedan växtens id
// ska nog nå user plants ÄNDRA

$filename = "../JSON-filer/userPlants.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "PATCH") {
   $error = ["error" => "Invalid HTTP method! (Only PATCH is allowed)"];
   sendJSON($error, 405);
}

$plantWaters = [];

if (!file_exists($filename)) {
   $error = ["error" => "We could not find the file"];
   sendJSON($error, 404);
}

if (!isset($requestData["userPlantId"], $requestData["water"])) {
   $error = ["error" => "Bad Request!"];
   sendJSON($error, 400);
}

$id = $requestData["userPlantId"];
$newWater = $requestData["water"];

if ($newWater == "") {
   $error = ["error" => "Bad Request!"];
   sendJSON($error, 400);
}

foreach ($plantWaters as $index => $plantWater) {
   if ($plantWaters["userplantId"] == $id) {
       $plantWater["water"] = $newWater;

       $json = json_encode($plantWaters, JSON_PRETTY_PRINT);
       file_put_contents($filename, $json);
       sendJSON($plantWater);
   }
}

$error = ["error" => "Plant not found"];
sendJSON($error, 404);


?>