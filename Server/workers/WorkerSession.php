<?php
/**
 * 
 * Class WorkerSession
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */
class WorkerSession
{
    public function setConnection($pk_user)
    {
        $_SESSION['connection'] = $pk_user;
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