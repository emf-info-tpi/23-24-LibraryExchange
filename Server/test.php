<?php

/**
 * This is a test file that can try all the call of the database
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

include_once('workers/Connexion.php');
include_once('workers/configConnexion.php');

include_once('workers/UserDBManager.php');
//include_once('workers/BookDBManager.php');

include_once('beans/Book.php');
include_once('beans/User.php');

$test = new UserDBManager();
//$check = $test->creatUser(new User(null,"JohnDoe","HushHushSecretPassword"));
//$check = $test->readUser("JohnDoe")->toXML();
$check = $test->updateUser(new User(4,"DoeJohn","EvenSecreterPassword"));
//$check = $test->deleteUser(1);

//$test = new LivreDBManager();
//$check = $test->creatLivre(new Livre(null,"fire punch T2",1, 1,null,null,"vraiment sympa"));
//$check = $test->readLivres(1);
//$check = $test->updateLivre(new Livre(12,"agduz",1, 1,null,null,"nul1peu"));
//$check = $test->deleteLivre(12);

//$test = new OeuvreDBManager();
//$check = $test->creatOeuvre(new Oeuvre(null,"mapu","goldlewis"));
//$check = $test->readOeuvres(1);
//$check = $test->updateOeuvre(new Oeuvre(3,"mapumapu","dickinson"));
//$check = $test->deleteOeuvre(3);

echo("<xmp>".$check."</xmp>");
?>