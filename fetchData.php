<?php

include "config.php";

if(isset($_POST['search'])){
 $search = $_POST['search'];

 $query = "select * from wpisy WHERE kategoria like '%".$search."%' or tytul like '%".$search."%' or wpis like '%".$search."%'";
 $result = mysqli_query($con,$query);

 $response = array();
 while($row = mysqli_fetch_array($result) ){
   $response[] = array("value"=>$row['tytul'],"label"=>$row['tytul']);
 }

 echo json_encode($response);
}

exit;