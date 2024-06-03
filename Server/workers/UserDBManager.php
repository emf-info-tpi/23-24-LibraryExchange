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

        $query = "INSERT INTO t_alias (pk_alias, name, fk_user) values(NULL, :id, :user)";
        $params = array('id' => htmlentities($user->getLogin()), 'user' => connexion::getInstance()->GetLastId('t_user'));
        connexion::getInstance()->ExecuteQuery($query, $params);

        return connexion::getInstance()->GetLastId('t_user');
    }

    public function readUser($login)
    {
        $query = "SELECT * FROM t_user left join t_alias on fk_user = pk_user where login = :id";
        $params = array('id' => htmlentities($login));
        $res = connexion::getInstance()->SelectQuery($query, $params);
        $user=new User(1,1,1,1);
        if($res!=null){
        $data = $res[0];
        $user = new User($data['pk_user'], $data['login'], $data['password'],$data['pk_alias']);
        }
        return $user;
    }
}
?>