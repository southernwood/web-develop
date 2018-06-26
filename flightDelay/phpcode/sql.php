<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href='http://fonts.googleapis.com/css?family=Oleo+Script' rel='stylesheet' type='text/css'>
<title>welcome to our websit</title>
<style>
.inputs{font: 200 40px/1.3 'Oleo Script', Helvetica, sans-serif;
  color: #003d79;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  left: 230px;  position: absolute; top: 430px;

  }

.outputs{
	font: 100 25px/1.3 'Oleo Script', Helvetica, sans-serif;
  color: #004B97;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  left: 350px;  position: absolute; top: 500px;
 text-align:center;
  }

.question {  
    display: inline-block;
    color: 66b3ff;
    font-size: 5em;
    font: 200 50px/1.3 'Oleo Script', Helvetica, sans-serif;
	left: 470px;  position: absolute; top: 360px;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(102, 230, 103, 1)),to(rgba(101, 224, 255, 1)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}; 
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
</style>
  
</head>
<body>
<div style="left: 350px;  position: absolute; top: 30px;"><img src="air_logo.png"></div>
<div style="left: 550px;  position: absolute; top: 40px;"><img src="airplane3.jpg"></div>
<div style="left: 450px;   position: absolute; top: 200px;"><img src="welcome.jpg"></div>
<div class = "question">What's your travel plan?</div>
<div  class="inputs";>
<!-- get chose from the user -->
<form action = "<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method = "post">
   Date: 2016&nbsp;
	 <select name = "month"; style="width:80px;font-size:20px;">
        <option VALUE = "01"> Jan</option>
        <option VALUE = "02">Feb</option>
		<option VALUE = "03">March</option>
		<option VALUE = "04">April</option>
		<option VALUE = "05">May</option>
		<option VALUE = "06">Jane</option>
		<option VALUE = "07">July</option>
		<option VALUE = "08">Aug</option>
		<option VALUE = "09">Sep</option>
		<option VALUE = "10">Oct</option>
		<option VALUE = "11">Nov</option>
		<option VALUE = "12">Dec</option>
    </select>&nbsp;
	<select name = "day"; style="width:50px;font-size:20px;">
        <option VALUE = "01"> 1</option>
        <option VALUE = "02">2</option>
		<option VALUE = "03">3</option>
		<option VALUE = "04">4</option>
		<option VALUE = "05">5</option>
		<option VALUE = "06">6</option>
		<option VALUE = "07">7</option>
		<option VALUE = "08">8</option>
		<option VALUE = "09">9</option>
		<option VALUE = "10">10</option>
        <option VALUE = "11"> 11</option>
        <option VALUE = "12">12</option>
		<option VALUE = "13">13</option>
		<option VALUE = "14">14</option>
		<option VALUE = "15">15</option>
		<option VALUE = "16">16</option>
		<option VALUE = "17">17</option>
		<option VALUE = "18">18</option>
		<option VALUE = "19">19</option>
		<option VALUE = "20">20</option>
        <option VALUE = "21">11</option>
        <option VALUE = "22">22</option>
		<option VALUE = "23">23</option>
		<option VALUE = "24">24</option>
		<option VALUE = "25">25</option>
		<option VALUE = "26">26</option>
		<option VALUE = "27">27</option>
		<option VALUE = "28">28</option>
		<option VALUE = "29">29</option>
		<option VALUE = "30">30</option>
		<option VALUE = "31">31</option>
    </select> 
	carrier:&nbsp;
	<select name = "carrier_code"; style="width:60px;font-size:20px;">
		<option VALUE = "Unknown" selected = "selected"></option>
		<option VALUE = "AA">AA</option>
        <option VALUE = "AS">AS</option>
		<option VALUE = "DL">DL</option>
		<option VALUE = "E*">E*</option>
		<option VALUE = "F9">F9</option>
		<option VALUE = "MQ">MQ</option>
        <option VALUE = "OO">OO</option>
		<option VALUE = "WN">WN</option>
		<option VALUE = "UA">UA</option>
		
	</select>
	&nbsp;St. &nbsp;Louis &nbsp;
	<select name = "act"; style="width:60px;font-size:20px;">
		<option VALUE = "departure">to</option>
        <option VALUE = "arrival">from</option>
	</select>&nbsp;
	<select name = "airport"; style="width:80px;font-size:20px;">
		<option VALUE = "Unknown" selected = "selected"></option>
		<option VALUE = "ATL">ATL</option>
        <option VALUE = "AUS">AUS</option>
		<option VALUE = "BNA">BNA</option>
		<option VALUE = "BOS">BOS</option>
		<option VALUE = "BWI">BWI</option>
		<option VALUE = "CLE">CLE</option>
        <option VALUE = "CLT">CLT</option>
		<option VALUE = "CMH">CMH</option>
		<option VALUE = "CVG">CVG</option>
		<option VALUE = "DAL">DAL</option>
        <option VALUE = "DCA">DCA</option>
		<option VALUE = "DEN">DEN</option>
		<option VALUE = "DFW">DFW</option>
		<option VALUE = "DTW">DTW</option>
		<option VALUE = "EWR">EWR</option>
        <option VALUE = "FLL">FLL</option>
		<option VALUE = "GRR">GRR</option>
		<option VALUE = "HOU">HOU</option>
		<option VALUE = "IAH">IAH</option>
        <option VALUE = "LAS">LAS</option>
		<option VALUE = "LAX">LAX</option>
		<option VALUE = "LGA">LGA</option>
		<option VALUE = "LIT">LIT</option>
		<option VALUE = "MCI">MCI</option>
        <option VALUE = "MCO">MCO</option>
	</select>
    <INPUT TYPE = "submit" name = "submit" />
</form>
</div>
<?php


    define('DB_HOST', 'localhost');
    define('DB_USER', '530a');
    define('DB_PASS', 'wustl');
    define('DB_NAME', 'flight');
	$flag = false;
	//connect with the database
	$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	if ($dbc->connect_error) {
    die("Connection failed: " . $dbc->connect_error);
	} 
	
	//get the weather info
	$url="http://api.openweathermap.org/data/2.5/forecast/city?id=4407066&APPID=d8e85b3e2e276badc310800c97aa4f57";
	$json=file_get_contents($url);
	if($json){
		$data=json_decode($json);

	//Get weather condition
		for($i = 0 ; $i < 5; $i++){
			$date = substr($data->list[8*$i]->dt_txt,0,10);
			$event = $data->list[8*$i]->weather[0]->main;
			$wind = $data->list[8*$i]->wind->speed;
			$humidity = $data->list[8*$i]->main->humidity;
			$wd = $data->list[8*$i]->wind->deg;
			// insert the new data
			$query = "insert into weather (date,Mean_wind,Mean_Humidity,WindDirDegrees,Events) values('$date','$wind','$humidity','$wd','$event')";
			if(!mysqli_query($dbc, $query)){
				// update the old data;
				$query = "update weather set Mean_wind = '$wind', Mean_Humidity = '$humidity', WindDirDegrees = '$wd', Events = '$event' where date='$date'";
			mysqli_query($dbc, $query);
			}
	
		}
	}
	else{
		echo "can't get the weather information, use old data".'</br>';
	}
	//get date from user:
	if(isset($_POST['month'])){
		$year = "2016";
		$date = $year."-".$_POST["month"]."-".$_POST["day"];
		//query the weather delay
		$query = "select Events from weather where date='$date'";
		$result = mysqli_query($dbc, $query);
		$row = mysqli_fetch_row($result);
		$weather = $row[0];
		if( $weather == "Clouds" || $weather == "Clear"){
			$weather = "";
		}
		//query the holiday name
		$query = "select name from calender_holiday where date='$date'";
		$result = mysqli_query($dbc, $query);
		$row = mysqli_fetch_row($result);
		$name = $row[0];
		if($_POST["act"] == "arrival"){			//if the action is arrival at St. Louis
			//weather_delay
			$query = "select mean_delay from weather_relate_arrival where events = '$weather'";
			$result = mysqli_query($dbc, $query);
			$row = mysqli_fetch_row($result);
			$weather_delay =$row[0];
			$carrier_code = $_POST["carrier_code"];
			//carrier_relate_delay
			$query = "select mean_delay from carrier_relate_arrival where carrier_code = '$carrier_code'";
			$result = mysqli_query($dbc, $query);
			$row = mysqli_fetch_row($result);
			$carrier_delay = $row[0];
			//holiday_relate_delay
			$query = "select mean_delay from holiday_relate_arrival where name = '$name'";
			$result = mysqli_query($dbc, $query);
			$row = mysqli_fetch_row($result);
			$holiday_delay = $row[0];
			//airport_relate_delay
			$airport = $_POST["airport"];
			$query = "select mean_delay from airport_relate_arrival where origin_airport = '$airport'";
			$result = mysqli_query($dbc, $query);
			$row = mysqli_fetch_row($result);
			$airport_delay = $row[0];
			$total_delay = $weather_delay + $carrier_delay + $holiday_delay + $airport_delay;
		//	echo "the origin airport is ".$airport." your carrier is ".$carrier_code." and your prediction is ".$total_delay." minutes";
			$display = "Your Origin Airport is &nbsp;<strong>".$airport."</strong>.&nbsp;&nbsp;&nbsp;Your Carrier Code is &nbsp;<strong>".$carrier_code."
			</strong><br> Your Excepted delay is &nbsp;<strong>".$total_delay."</strong> minutes";
			//$display = "testing";
			$flag = true;
			
			}
		else if($_POST["act"] == "departure"){	// the action is departure
			//weather_delay
			$query = "select mean_delay from weather_relate_departure where events = '$weather'";
			$result = mysqli_query($dbc, $query);
			$row = mysqli_fetch_row($result);
			$weather_delay =$row[0];
			$carrier_code = $_POST["carrier_code"];
			//carrier_relate_delay
			$query = "select mean_delay from carrier_relate_departure where carrier_code = '$carrier_code'";
			$result = mysqli_query($dbc, $query);
			$row = mysqli_fetch_row($result);
			$carrier_delay = $row[0];
			//holiday_relate_delay
			$query = "select mean_delay from holiday_relate_departure where name = '$name'";
			$result = mysqli_query($dbc, $query);
			$row = mysqli_fetch_row($result);
			$holiday_delay = $row[0];
			//airport_relate_delay
			$airport = $_POST["airport"];
			$query = "select mean_delay from airport_relate_departure where destination = '$airport'";
			$result = mysqli_query($dbc, $query);
			$row = mysqli_fetch_row($result);
			$airport_delay = $row[0];
			$total_delay = $weather_delay + $carrier_delay + $holiday_delay + $airport_delay;
			$display = "Your Destination Airport is &nbsp;<strong>".$airport."</strong>. &nbsp;&nbsp;&nbsp;Your Carrier Code is &nbsp;<strong>".$carrier_code."
			</strong><br> Your Excepted delay is &nbsp;<strong>".$total_delay."</strong> minutes";
			$flag = true;
			//echo "the destination airport is ".$airport." your carrier is ".$carrier_code." and your prediction is ".$total_delay." minutes";
		}

		
	}
?>


<div  class="outputs";>
<?php 
	if($flag){
		echo $display;
		//echo $_POST["act"];
		$display ="";
		$flag = false;
	}
?>
</div>
<div style="left: 550px;  position: absolute; top: 600px;"><a href="history.php">see more history reports </a> </div>

<?php 
	mysqli_close($dbc);
?>
</body>
</html>