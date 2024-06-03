<?php
session_start();
include_once('workers/ExchangeDBManager.php');
include_once('workers/Connexion.php');
include_once('workers/configConnexion.php');
include_once('beans/Book.php');
include_once('workers/WorkerSession.php');

$exchangeDBManager = new ExchangeDBManager();
$wrkSession = new WorkerSession();

if (isset($_SERVER['REQUEST_METHOD'])) {
    switch ($_SERVER['REQUEST_METHOD']) {

        case 'POST':
            $vars = json_decode(file_get_contents("php://input"), true);
            if ($wrkSession->isOpen()) {
                if (isset($vars['books'])) {
                    $testReturn = "";
                    foreach ($vars['books'] as $pk_book) {
                        $testReturn .= $pk_book . " ";
                    }
                    echo $testReturn;
                    http_response_code(200);
                } elseif (isset($vars['pk_exchange'])) {

                    http_response_code(200);
                } else {
                    http_response_code(404);
                }
            } else {
                http_response_code(405);
            }
            break;
    }
}
