<?php

$data = json_decode(array_keys($_POST)[0], true);

print_r($data);
if(count($data)) {
$newOrder = "";
	// echo $data["data"]["height"];
	$newOrder = $newOrder . "Высота стоек: " . $data["data"]["height"]."\r\n";
	$newOrder = $newOrder . "Полки " . $data["data"]["width"] . "x" . $data["data"]["deep"] . ": " . $data["data"]["shelveQty"] . "шт"."\r\n";
	if($data["data"]["boxQty"]) {
	$newOrder = $newOrder . "Ящики " . $data["data"]["box"]["id"] . ": " . $data["data"]["boxQty"] . "шт"."\r\n";
	}
}
mail("ntorgov@gmail.com", "Новый заказ из калькулятора", $newOrder);
?>
