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

    public function concludeExchange($pk_exchange, $pk_alias)
    {
        return true;
    }

    public function createExchange($books, $pk_alias)
    {
        return true;
    }
}
