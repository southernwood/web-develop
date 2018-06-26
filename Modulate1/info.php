<!DOCTYPE html>
<head><title>Person Information</title></head>
<body>
<?php
$first = $_POST['firstname'];
$last = $_POST['lastname'];
$birthyear = (int) $_POST['birthyear'];
$gender = $_POST['gender'];
$age = 2012 - $birthyear;
 
printf("<p>Hello, %s %s!  You were born in %d, so you are %d years old.  You are %s.</p>\n",
	htmlentities($first),
	htmlentities($last),
	$birthyear,
	$age,
	htmlentities($gender)
);
?>
</body>
</html>