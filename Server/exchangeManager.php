<?php

/**
 * script exchangeManager
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

session_start();
include_once('workers/ExchangeDBManager.php');
include_once('workers/Connexion.php');
include_once('workers/configConnexion.php');
include_once('beans/Book.php');
include_once('workers/WorkerSession.php');
include_once('lib/phpqrcode/qrlib.php');

$exchangeDBManager = new ExchangeDBManager();
$wrkSession = new WorkerSession();

if (isset($_SERVER['REQUEST_METHOD'])) {
    if ($wrkSession->isOpen()) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                if (isset($_GET['pk_exchange'])) {
                    $debugLog = ob_get_contents();
                    ob_end_clean();
                    QRcode::png("https://libraryexchange.emf-infopro-tpi.ch/23-24-LibraryExchange/Client/?" . $_GET['pk_exchange']);
                } else {
                    http_response_code(404);
                }
                break;
            case 'POST':
                $varsJSON = json_decode(file_get_contents("php://input"), true);
                parse_str(file_get_contents("php://input"), $vars);

                if (isset($varsJSON['books']) and isset($varsJSON['action'])) {
                    if ($varsJSON['action'] == 'exchange') {
                        echo $exchangeDBManager->initExchange($varsJSON['books']);
                        http_response_code(200);
                    } elseif ($varsJSON['action'] == 'giveBack') {
                        $exchangeDBManager->giveBackBooks($varsJSON['books']);
                        http_response_code(200);
                    }
                } elseif (isset($vars['pk_exchange']) and isset($vars['alias'])) {
                    $exchangeDBManager->concludeExchangeWithAlias($vars['pk_exchange'], $vars['alias']);
                    http_response_code(200);
                } elseif (isset($vars['pk_exchange'])) {
                    $pk_exchange = substr($vars['pk_exchange'], strpos($vars['pk_exchange'], "?") + 1);
                    $exchangeDBManager->concludeExchange($pk_exchange, $wrkSession->getconnection());
                    http_response_code(200);
                } else {
                    http_response_code(404);
                }
                break;
        }
    } else {
        echo "you are not connected";
        http_response_code(405);
    }
}
