<?php

$host = "localhost";    /* Host name */
$user = "user";         /* User */
$password = "password";         /* Password */
$dbname = "database-name";   /* Database name */

// Create connection
$con = mysqli_connect($host, $user, $password,$dbname);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

