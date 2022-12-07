<?php 
ini_set(display errors, 1);

require_once "functions.php";

// nå den växtens id för att nå den växtens objekt→nyckel för anteckningar
// så kolla id:t → if sats?
// måste nå userns id och sedan växtens id

$filename = "users.json";
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod != "PATCH") {
   $error = ["error" => "Invalid HTTP method! (Only PATCH is allowed)"];
   sendJSON($error, 405);
}

$plantWater = [];

if (!file_exists($filename)) {
   $error = ["error" => "We could not find the file"];
   sendJSON($error, 404);
}

if (!isset($requestData["id"], $requestData["water"])) {
   $error = ["error" => "Bad Request!"];
   sendJSON($error, 400);
}

$id = $requestData["id"];
$newWater = $requestData["water"];

if ($newWater == "") {
   $error = ["error" => "Bad Request!"];
   sendJSON($error, 400);
}

foreach ($users as $index => $user) {
   if ($user["id"] == $id) {
       $plant["water"] = $newWater;

       $json = json_encode($users, JSON_PRETTY_PRINT);
       file_put_contents($filename, $json);
       sendJSON($user);
   }
}

$error = ["error" => "Plant not found"];
kalla vår egna funktion → sendJSON($error, 404);


?>