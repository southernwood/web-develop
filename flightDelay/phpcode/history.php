<!DOCTYPE html>
<html>
<body>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href='http://fonts.googleapis.com/css?family=Oleo+Script' rel='stylesheet' type='text/css'>
<title>histroy reports</title>
<style>
a:link{
color:#003d79; 
text-decoration:none; 
} 
a:visited { 
color:#003d79; 
text-decoration:none; 
} 
a:hover, 
a:active { 
color:#65E0F7; 
text-decoration:none; 
} 
.table{
	font: 80 12px/1.3 'Oleo Script', Helvetica, sans-serif;
  color: #2b2b2b;
  left: 300px;  position: absolute; top: 100px;
 text-align:center;
  }
.question{font: 200 20px/1.3 'Oleo Script', Helvetica, sans-serif;
  color: #003d79;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  left: 250px;  position: absolute; top: 50px;

}


</style>
</head>
<div class = "question ">
<form action = "<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method = "post">
	What kind of reports you want to see ?
	 <select name = "question">
	 <option VALUE = "Unknown" selected = "selected"></option>
        <option VALUE = "1"> Overview the Rank between carriers </option>
		<option VALUE = "2"> Overview under different weather condition </option>
		<option VALUE = "3"> Overview the difference in a week </option>
		<option VALUE = "4"> Overview between holidays </option>
    </select>
    <INPUT TYPE = "submit" name = "submit" />
</form>
</div>

<div class = "table">
<?php
	
    define('DB_HOST', 'localhost');
    define('DB_USER', '530a');
    define('DB_PASS', 'wustl');
    define('DB_NAME', 'flight');
	
	//connect with the database
	$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	if ($dbc->connect_error) {
    die("Connection failed: " . $dbc->connect_error);
	} 
	
	function showTable($dbc, $query){ 
	$res = $dbc->query($query);
	//get lines and rows

	echo "<table border=1><tr>";
	while($field=$res->fetch_field()){
		echo "<th>{$field->name}</th>";
	}
	echo "</tr>";
	
	while($row=$res->fetch_row()){
		echo "<tr>";
		foreach($row as $value){
		echo "<td>$value</td>";
	}
	echo "</tr>";
	}
	echo "</table>"; 
	$res->free();
}
	

	if(isset($_POST['question'])){
	
	if($_POST['question'] == 1 ){
		echo "Departure <br><br>";
		$query = "select * from carrier_relate_departure order by mean_delay";
		showTable($dbc, $query);
		echo "<br><br>Arrival <br><br>";
		$query = "select * from carrier_relate_arrival order by mean_delay";
		showTable($dbc, $query);
		
	}else if($_POST['question'] == 2){
		echo "Departure <br><br>";
		$query = "select * from weather_relate_departure order by mean_delay";
		showTable($dbc, $query);
		echo "<br><br>Arrival <br><br>";
		$query = "select * from weather_relate_arrival order by mean_delay";
		showTable($dbc, $query);
		
	}else if($_POST['question'] == 3){
		echo "Departure <br><br>";
		$query = "select dayname(date), count(*)as number_lines, avg(departure_delay)as mean_delay ,std(departure_delay) as SD_delay, max(departure_delay) as Max_delay from
		flight_departure group by dayname(date) order by mean_delay ";
		showTable($dbc, $query);
		echo "<br><br>Arrival <br><br>";
		$query = "select dayname(date), count(*)as number_lines, avg(arrival_delay)as mean_delay ,std(arrival_delay) as SD_delay, max(arrival_delay) as Max_delay from
		flight_arrival group by dayname(date) order by mean_delay";
		showTable($dbc, $query);

		
	}else if($_POST['question'] == 4 ){
		echo "Departure <br><br>";
		$query = "select * from holiday_relate_departure order by mean_delay";
		showTable($dbc, $query);
		echo "<br><br>Arrival <br><br>";
		$query = "select * from holiday_relate_arrival order by mean_delay";
		showTable($dbc, $query);
		
	}

	
	}


?>

</div>
<?php 
	mysqli_close($dbc);
?>
<div style="left: 650px;  position: absolute; top: 700px;"><a href="sql.php">return</a> </div>
</body>
</html>