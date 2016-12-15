<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	</head>
<body>
<?php

$filePath = dirname(__FILE__) . '/';

require_once($filePath . 'twitteroauth/twitteroauth.php');
$const = json_decode(file_get_contents($filePath . "public/config.json"));
$woid = "1940345";// --- where on earth ID for dubai --- (1 = global/earth) ---

$consumerkey = $const->consumer_key;
$consumersecret = $const->consumer_secret;
$accesstoken = $const->access_token;
$accesstokensecret = $const->access_token_secret;
$connection = new TwitterOAuth($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
$dubai_trends = $connection->get("https://api.twitter.com/1.1/trends/place.json", [ "id" => $woid]);

$trends = '';
foreach ($dubai_trends[0]->trends as $value) {
	$trends .= htmlentities($value->name, ENT_QUOTES, "UTF-8") . PHP_EOL;
}

file_put_contents($filePath . 'public/data/trends.txt', $trends);

?>

</body>
</html>
