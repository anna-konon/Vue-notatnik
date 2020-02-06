<?php
include "config.php";

$data = json_decode(file_get_contents("php://input"));

$request = $data->request;

// Fetch All records
if($request == 1){
	$wpisData = mysqli_query($con,"select * from wpisy order by dataWpisu desc");

	$response = array();
	while($row = mysqli_fetch_assoc($wpisData)){
	    $response[] = $row;
	}

	echo json_encode($response);
	exit;
}

// Add record
if($request == 2){
	$wpis = $data->wpisNowy;
	$kategoria = $data->kategoria;
	$tytul = $data->tytul;
	$dataWpisu = $data->dataWpisu;

	$wpisData = mysqli_query($con,"SELECT * FROM wpisy WHERE wpis='".$wpis."'");
	if(mysqli_num_rows($wpisData) == 0){
		mysqli_query($con,"INSERT INTO wpisy(wpis,kategoria,tytul,dataWpisu) VALUES('".$wpis."','".$kategoria."','".$tytul."','".$dataWpisu."')");
	}

	exit;
}
if($request == 22){
	$wpis = $data->wpisNowy;
	$kategoria = $data->selectedAdd;
	$tytul = $data->tytul;
	$dataWpisu = $data->dataWpisu;

	$wpisData = mysqli_query($con,"SELECT * FROM wpisy WHERE wpis='".$wpis."'");
	if(mysqli_num_rows($wpisData) == 0){
		mysqli_query($con,"INSERT INTO wpisy(wpis,kategoria,tytul,dataWpisu) VALUES('".$wpis."','".$kategoria."','".$tytul."','".$dataWpisu."')");
	}

	exit;
}

// Update record
if($request == 3){
	$id = $data->id;
	$wpis = $data->wpis;

	mysqli_query($con,"UPDATE wpisy SET wpis='".$wpis."', dataWpisu=now() WHERE id=".$id);
		 
	echo "Update record";
	exit;
}

// Delete record
if($request == 4){
	$id = $data->id;

	mysqli_query($con,"DELETE FROM wpisy WHERE id=".$id);

	echo "Delete successfully";
	exit;
}

// Search record
if($request == 5){
	$kategoria = $data->searchInput;
	$tytul = $data->searchInput;
	$wpis = $data->searchInput;
	$wpisData = mysqli_query($con,"select * from wpisy WHERE kategoria like '%".$kategoria."%' or tytul like '%".$tytul."%' or wpis like '%".$wpis."%'");

	$response = array();
	while($row = mysqli_fetch_assoc($wpisData)){
	    $response[] = $row;
	}

	echo json_encode($response);
	exit;
}

// All categories
if($request == 6){
	$wpisData = mysqli_query($con,"select distinct(kategoria) as kategoria from wpisy");

	$response = array();
	while($row = mysqli_fetch_assoc($wpisData)){
	    $response[] = $row;
	}

	echo json_encode($response);
	exit;
}
// Search category record
if($request == 7){
	$kategoria = $data->selected;
	$wpisData = mysqli_query($con,"select * from wpisy WHERE kategoria like '%".$kategoria."%' order by dataWpisu desc");

	$response = array();
	while($row = mysqli_fetch_assoc($wpisData)){
	    $response[] = $row;
	}

	echo json_encode($response);
	exit;
}
// Fetch letest records
if($request == 8){
	$limit = $data->num;
	$wpisData = mysqli_query($con,"select * from wpisy order by dataWpisu desc LIMIT ".$limit.";");

	$response = array();
	while($row = mysqli_fetch_assoc($wpisData)){
	    $response[] = $row;
	}

	echo json_encode($response);
	exit;
}

// Search id record
if($request == 9){
	$id = $data->id;
	$wpisData = mysqli_query($con,"select * from wpisy WHERE id like '%".$id."%'");

	$response = array();
	while($row = mysqli_fetch_assoc($wpisData)){
	    $response[] = $row;
	}

	echo json_encode($response);
	exit;
}

// Search in note post record
if($request == 10){
	$wpis = $data->searchInput;
	$wpisData = mysqli_query($con,"select * from wpisy WHERE tytul like '%".$tytul."%' AND wpis like '%".$wpis."%' order by dataWpisu desc");

	$response = array();
	while($row = mysqli_fetch_assoc($wpisData)){
	    $response[] = $row;
	}

	echo json_encode($response);
	exit;
}
?>