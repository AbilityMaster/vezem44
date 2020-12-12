<?php

$name = $_POST['popup-name'];
$phone = $_POST['popup-phone'];

$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);

$name = trim($name);
$phone = trim($phone);

echo $SERVER_NAME;

echo $name;
echo "<br>";
echo $phone;

if (mail("makavoloka@gmail.com", "Заявка с сайта", "Имя:".$name.". E-mail: ".$phone ,"From: vezem44.ru \r\n"))
 {
    echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}

?>