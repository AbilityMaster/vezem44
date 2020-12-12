$name = $_POST['popup-name'];
$phone = $_POST['popup-phone'];

$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);

$name = trim($name);
$phone = trim($phone);


echo $name;
echo "<br>";
echo $phone;