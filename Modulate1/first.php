<!DOCTYPE html>
<head><title>Hello World</title></head>
<body>
<form action="info.php" method="POST">
	<p>
		<label for="firstnameinput">First Name:</label>
		<input type="text" name="firstname" id="firstnameinput" />
	</p>
	<p>
		<label for="lastnameinput">Last Name:</label>
		<input type="text" name="lastname" id="lastnameinput" />
	</p>
	<p>
		<label for="birthyearinput">Birth Year:</label>
		<input type="number" name="birthyear" id="birthyearinput" />
	</p>
	<p>
		<strong>Gender:</strong>
		<input type="radio" name="gender" value="male" id="maleinput" /> <label for="maleinput">Male</label> &nbsp;
		<input type="radio" name="gender" value="female" id="femaleinput" /> <label for="femaleinput">Female</label>
	</p>
	<p>
		<input type="submit" value="Send" />
		<input type="reset" />
	</p>
</form>
</body>
</html>