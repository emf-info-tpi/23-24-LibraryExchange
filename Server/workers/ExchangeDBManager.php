<?php

/**
 * Class ExchangeDBManager
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

class ExchangeDBManager
{
    public function initExchange($books)
    {
        $query = "INSERT INTO t_exchange (pk_exchange, fk_alias_receiver, date_exchange) values(NULL, NULL, NULL)";
        connexion::getInstance()->ExecuteQuery($query, null);
        $pk_exchange = connexion::getInstance()->GetLastId('t_exchange');
        //handle each book
        foreach ($books as $pk_book) {
            $query = "INSERT INTO tr_exchange_book (pfk_exchange, pfk_book) values(:exchange, :book)";
            $params = array('exchange' => $pk_exchange, 'book' => $pk_book);
            connexion::getInstance()->ExecuteQuery($query, $params);
        }

        return $pk_exchange;
    }

    public function concludeExchangeWithAlias($pk_exchange, $alias)
    {
        $query = "INSERT INTO t_alias (pk_alias, name, fk_user) values(NULL, :id, NULL)";
        $params = array('id' => htmlentities($alias));
        connexion::getInstance()->ExecuteQuery($query, $params);

        $this->concludeExchange($pk_exchange, connexion::getInstance()->GetLastId('t_alias'));
        
    }

    public function concludeExchange($pk_exchange, $alias)
    {
        $query = "UPDATE t_exchange SET fk_alias_receiver = :alias, date_exchange = NOW() WHERE pk_exchange = :pk_exchange";
        $params = array('alias' => $alias, 'pk_exchange' => htmlentities($pk_exchange));
        connexion::getInstance()->ExecuteQuery($query, $params);

        $this->updateBooksCurrentExchange($pk_exchange);
    }

    private function updateBooksCurrentExchange($pk_exchange)
    {
        $query = "UPDATE t_book b
        JOIN tr_exchange_book teb ON b.pk_book = teb.pfk_book
        SET b.fk_exchange_current = teb.pfk_exchange
        WHERE teb.pfk_exchange = :exchange;
        ";
        $params = array('exchange' => htmlentities($pk_exchange));
        connexion::getInstance()->ExecuteQuery($query, $params);
    }

    public function createExchange($books, $pk_alias)
    {
        return true;
    }

    public function giveBackBooks($books)
    {
        foreach ($books as $pk_book) {
            $query = "UPDATE t_book SET fk_exchange_current = NULL WHERE pk_book = :book";
            $params = array('book' => htmlentities($pk_book));
            connexion::getInstance()->ExecuteQuery($query, $params);
        }
    }
}
