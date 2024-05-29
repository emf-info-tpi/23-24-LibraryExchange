<?php

/**
 * Class UserDBManager
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

class UserDBManager
{
    public function createUser($user)
    {
        $query = "INSERT INTO t_user (pk_user, login, password) values(NULL, :id, :password)";
        $params = array('id' => htmlentities($user->getLogin()), 'password' => password_hash($user->getPassword(), PASSWORD_DEFAULT));
        connexion::getInstance()->ExecuteQuery($query, $params);
        return connexion::getInstance()->GetLastId('t_user');
    }

    public function readUsers()
    {
        $query = "SELECT * FROM t_user";
        $res = connexion::getInstance()->SelectQuery($query, array());
        $users = '<users>';
        foreach ($res as $data) {
            $user = new User($data['pk_user'], $data['login'], $data['password']);
            $users .= $user->toXML();
        }
        $users .= '</users>';
        return $users;
    }

    public function readUser($login)
    {
        $query = "SELECT * FROM t_user where login = :id";
        $params = array('id' => htmlentities($login));
        $res = connexion::getInstance()->SelectQuery($query, $params);
        $user=new User(1,1,1);
        if($res!=null){
        $data = $res[0];
        $user = new User($data['pk_user'], $data['login'], $data['password']);
        }
        return $user;
    }

    public function updateUser($user)
    {
        $query = "UPDATE t_user set login = :id , password = :password where pk_user = :pk";
        $params = array('id' => htmlentities($user->getLogin()), 'password' => password_hash($user->getPassword(), PASSWORD_DEFAULT), 'pk' => htmlentities($user->getPkUser()));
        $res = connexion::getInstance()->ExecuteQuery($query, $params);
        return $res;
    }

    public function deleteUser($pk_user)
    {
        $query = "DELETE from t_user where pk_user = :pk";
        $params = array('pk' => htmlentities($pk_user));
        $res = connexion::getInstance()->ExecuteQuery($query, $params);
        return $res;
    }
}
?>