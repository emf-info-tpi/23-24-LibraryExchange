<?php

/**
 * This is a test file
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

include_once('workers/Connexion.php');
include_once('workers/configConnexion.php');

include_once('workers/UserDBManager.php');
include_once('workers/BookDBManager.php');

include_once('beans/Book.php');
include_once('beans/User.php');

$test = new UserDBManager();

//$check = $test->createUser(new User(null,"mr.test","Password"));
//$check = $test->readUser("JohnDoe")->toXML();
//$check = $test->updateUser(new User(4,"DoeJohn","hushHushSecretPassword"));
//$check = $test->deleteUser(4);

//$test = new BookDBManager();
//$check = $test->createBook(new Book(null,9782385031060,"The Unwanted Undead Adventurer", 11,2,1));
//$check = $test->readBook(6)->toXML();
//$check = $test->readRelatedBooks(2);
//$check = $test->updateBook(new Book(5,9782385031053,"The Unwanted Undead Adventurer", 10,2,1));
//$check = $test->deleteBook(4);

echo("<xmp>".$check."</xmp>");
?>