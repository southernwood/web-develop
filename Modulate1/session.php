<?php
session_start();
 
$oldnum = (int) @$_SESSION['inc_num'];
if($oldnum<1) $oldnum=1;
$newnum = $oldnum*2;
 
echo $newnum;
$_SESSION['inc_num'] = $newnum;
?>