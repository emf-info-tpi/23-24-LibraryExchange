<?php

/**
 * Class User
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

class User
{
    private $login;

    private $password;

    private $pk_user;

    public function __construct($pk_user, $login, $password)
    {
        $this->login = $login;
        $this->password = $password;
        $this->pk_user = $pk_user;
    }

    public function getLogin()
    {
        return $this->login;
    }

    public function getPkUser()
    {
        return $this->pk_user;
    }

    public function setLogin($login)
    {
        $this->login = $login;
    }

    public function setPkUser($pk_user)
    {
        $this->pk_user = $pk_user;
    }

    public function toXML()
    {
        $result = '<user>';
        $result = $result . '<pk_user>' . $this->getPkUser() . '</pk_user>';
        $result = $result . '<login>' . $this->getLogin() . '</login>';
        $result = $result . '<password>' . $this->getPassword() . '</password>';
        $result = $result . '</user>';
        return $result;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password): self
    {
        $this->password = $password;
        return $this;
    }

    /* this implementation use a ": self"
    public function setPassword($password): self
    {
        $this->password = $password;
        return $this;
    }
    */
}
