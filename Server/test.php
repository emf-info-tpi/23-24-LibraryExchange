<?php

/**
 * This is a test file that can try all the call of the database
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

include_once('workers/Connexion.php');
include_once('workers/configConnexion.php');

//include_once('workers/UserDBManager.php');
include_once('workers/BookDBManager.php');

include_once('beans/Book.php');
include_once('beans/User.php');

//$test = new UserDBManager();
//$check = $test->creatUser(new User(null,"JohnDoe","HushHushSecretPassword"));
//$check = $test->readUser("JohnDoe")->toXML();
//$check = $test->updateUser(new User(4,"DoeJohn","EvenSecreterPassword"));
//$check = $test->deleteUser(4);

//$test = new BookDBManager();
//$check = $test->creatBook(new Book(null,9782385031060,"The Unwanted Undead Adventurer", 11,2,1));
//$check = $test->readBook(6)->toXML();
//$check = $test->readBooks(1);
//$check = $test->updateBook(new Book(5,9782385031053,"The Unwanted Undead Adventurer", 10,2,1));
//$check = $test->deleteBook(4);

//$test = new OeuvreDBManager();
//$check = $test->creatOeuvre(new Oeuvre(null,"mapu","goldlewis"));
//$check = $test->readOeuvres(1);
//$check = $test->updateOeuvre(new Oeuvre(3,"mapumapu","dickinson"));
//$check = $test->deleteOeuvre(3);

echo("<xmp>".$check."</xmp>");
?>