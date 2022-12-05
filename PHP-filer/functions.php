<?php 
ini_set("display_errors", 1);
$filename = "plants.json";

function sendJSON ($data, $statusCode = 200) {
    header("Content-Type: application/json");
    http_response_code($statusCode);
    $json = json_encode($data);
    echo $json;
    exit();
}
?>