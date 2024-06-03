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
            $varsJSON = json_decode(file_get_contents("php://input"), true);
            parse_str(file_get_contents("php://input"), $vars);
            if ($wrkSession->isOpen()) {

                if (isset($varsJSON['books'])) {
                    echo $exchangeDBManager->initExchange($varsJSON['books']);
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
