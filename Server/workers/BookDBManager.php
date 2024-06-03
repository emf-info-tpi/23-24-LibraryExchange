<?php

/**
 * Class BookDBManager
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

 class BookDBManager
{
    public function createBook($book)
    {
        $query = "INSERT INTO t_book (pk_book, isbn, name, number, fk_series, fk_alias_owner) values(NULL, :isbn, :name, :number, :series, :owner)";
        $params = array('name' => htmlentities($book->getName()), 'isbn' => htmlentities($book->getIsbn()), 'number' => htmlentities($book->getNumber()), 'series' => $book->getFk_series(), 'owner' => htmlentities($book->getFk_alias_owner()));
        connexion::getInstance()->ExecuteQuery($query, $params);
        return connexion::getInstance()->GetLastId('t_book');
    }

    public function readBook($pk_book)
    {
        $query = "SELECT * FROM t_book WHERE pk_book = :pk_book";
        $params = array('pk_book' => $pk_book);
        //TODO add try and catch for proper error handling
        $res = connexion::getInstance()->SelectSingleQuery($query,$params);
        $book = new Book($pk_book, $res['isbn'], $res['name'], $res['number'], $res['fk_series'], $res['fk_alias_owner']);
        return $book;
    }

    public function readRelatedBooks($pk_alias)
    {
        $query = "SELECT * from t_book book LEFT JOIN t_exchange ex ON book.fk_exchange_current = ex.pk_exchange WHERE fk_alias_owner = :alias OR ex.fk_alias_receiver = :alias";
        $params = array('alias' => htmlentities($pk_alias));
        $res = connexion::getInstance()->SelectQuery($query,$params);
        $books = '{"books": [';
        foreach ($res as $data) {
            $book = new Book($data['pk_book'], $data['isbn'], $data['name'], $data['number'], $data['fk_series'], $pk_alias);
            $books .= $book->toJSON();
        }
        //TODO find a way to create proper json if no book
        $books = substr($books,0,-1).']}';
        //$books .= ']}';
        return $books;
    }

    public function updateBook($book)
    {
        $query = "UPDATE t_book set isbn = :isbn, name = :name, number = :number, fk_series = :series, fk_alias_owner = :owner where pk_book = :pk_book";
        $params = array('pk_book' => htmlentities($book->getPk_book()), 'name' => htmlentities($book->getName()), 'isbn' => htmlentities($book->getIsbn()), 'number' => htmlentities($book->getNumber()), 'series' => htmlentities($book->getFk_series()), 'owner' => htmlentities($book->getFk_alias_owner()));
        $res = connexion::getInstance()->ExecuteQuery($query, $params);
        return $res;
    }

    public function deleteBook($pk_book)
    {
        $query = "DELETE from t_book where pk_book = :pk_book";
        $params = array('pk_book' => htmlentities($pk_book));
        $res = connexion::getInstance()->ExecuteQuery($query, $params);
        return $res;
    }
}
?>