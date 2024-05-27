<?php
/**
 * 
 * Class WorkerSession
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */
class WorkerSession
{
    public function setConnexion($pk_utilisateur)
    {
        $_SESSION['connection'] = $pk_utilisateur;
    }

    public function close()
    {
        if ($this->isOpen())
            session_destroy();
    }

    public function isOpen()
    {
        return isset($_SESSION['connection']);
    }

    public function getconnection()
    {
        return $_SESSION['connection'];
    }
}
?>