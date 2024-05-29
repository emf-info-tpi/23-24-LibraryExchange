<?php

/**
 * Class ExchangeDBManager
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

 class ExchangeDBManager
{
    public function initExchange($books){
        $pk_exchange = 0;
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
?>