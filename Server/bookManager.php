<?php

/**
 * script bookManager
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

session_start();
include_once('workers/BookDBManager.php');
include_once('workers/Connexion.php');
include_once('workers/configConnexion.php');
include_once('beans/Book.php');
include_once('workers/WorkerSession.php');

$bookDBManager = new BookDBManager();
$wrkSession = new WorkerSession();

if (isset($_SERVER['REQUEST_METHOD'])) {
    if ($wrkSession->isOpen()) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':

                if (isset($_GET['pk_book'])) {
                    //TODO make sure user is supposed to see the book
                    echo substr($bookDBManager->readBook($_GET['pk_book'])->toJSON(), 0, -1);
                    http_response_code(200);
                } else {
                    echo $bookDBManager->readRelatedBooks($wrkSession->getconnection());
                    http_response_code(200);
                }

                break;
            case 'POST':
                parse_str(file_get_contents("php://input"), $vars);
                if (isset($vars['pk_book']) and isset($vars['isbn']) and isset($vars['name']) and isset($vars['number'])) {
                    //no series and no fk_receiver for now
                    $bookDBManager->updateBook(new Book($vars['pk_book'], $vars['isbn'], $vars['name'], $vars['number'], null, $wrkSession->getconnection(),null));
                    http_response_code(200);
                } elseif (isset($vars['isbn']) and isset($vars['name']) and isset($vars['number'])) {
                    //no series and no fk_receiver for now
                    $bookDBManager->createBook(new Book(null, $vars['isbn'], $vars['name'], $vars['number'], null, $wrkSession->getconnection(),null));
                    http_response_code(200);
                } else {
                    http_response_code(405);
                }
                break;
            case 'DELETE':
                parse_str(file_get_contents("php://input"), $vars);
                if (isset($vars['pk_book'])) {
                    $bookDBManager->deleteBook($vars['pk_book']);
                    http_response_code(200);
                } else {
                    http_response_code(405);
                }
        }
    } else {
        echo "you are not connected";
        http_response_code(405);
    }
}
