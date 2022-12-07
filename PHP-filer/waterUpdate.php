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

$plantNotes = [];

if (file_exists($filename)) {
   $json = file_get_contents($filename);
   $plants = json_decode($json, true);
}

$requestJSON = file_get_contents("php://input");
$requestData = json_decode($requestJSON, true);

if (!isset($requestData["id"], $requestData["notes"])) {
   $error = ["error" => "Bad Request!"];
   sendJSON($error, 400);
}

$id = $requestData["id"];
$newNotes = $requestData["notes"];

if ($newNotes == "") {
   $error = ["error" => "Bad Request!"];
   sendJSON($error, 400);
}

foreach ($users as $index => $user) {
   if ($user["id"] == $id) {
       $plant["notes"] = $newNotes;

       $json = json_encode($users, JSON_PRETTY_PRINT);
       file_put_contents($filename, $json);
       sendJSON($user);
   }
}

variabel error = ["error" => "Plant not found"];
kalla vår egna funktion → sendJSON($error, 404);


?>