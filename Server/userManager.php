<?php
session_start();
include_once('workers/UserDBManager.php');
include_once('workers/Connexion.php');
include_once('workers/configConnexion.php');
include_once('beans/User.php');
include_once('workers/WorkerSession.php');

$userDBManager = new UserDBManager();
$wrkSession = new WorkerSession();

if (isset($_SERVER['REQUEST_METHOD'])) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            /*
            echo $utilisateurDBManager->readUtilisateurs();
            http_response_code(200);
            break;
*/
        case 'POST':
            parse_str(file_get_contents("php://input"), $vars);
            if (isset($vars['username']) and isset($vars['password']) and isset($vars['status'])) {

                if ($vars['status'] == 'new') {
                    //account creation

                    if ($userDBManager->createUser(new User(null, $vars['username'], $vars['password'],null)) > 0) {
                        http_response_code(200);
                    } else {
                        http_response_code(405);
                    }
                } elseif ($vars['status'] == 'login') {
                    //login
                    $user = $userDBManager->readUser($vars['username']);
                    if (password_verify($vars['password'], $user->getPassword())) {
                        $wrkSession->setConnection($user->getPkAlias());
                        //echo ($wrkSession->getconnection());
                        http_response_code(200);
                    } else {
                        $wrkSession->close();
                        http_response_code(405);
                    }
                }
            } else {
                http_response_code(404);
            }
            break;
    }
}
