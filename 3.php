<?php 
header("Content-Type: text/html; charset=utf-8");
$uname = $_GET[ 'uname' ];
$pw = $_GET[ 'pw' ];

if($uname =="admin"&& $pw=="123"){
	echo "1";
	die;
}
echo "2";


 ?>
