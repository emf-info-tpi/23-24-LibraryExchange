<?php

/**
 * Class Book
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

class Book
{
    private $pk_book;
    private $isbn;
    private $name;
    private $number;
    private $fk_series;
    private $fk_alias_owner;

    public function __construct($pk_book, $isbn, $name, $number, $fk_series, $fk_alias_owner)
    {
        $this->name = $name;
        $this->pk_book = $pk_book;
        $this->fk_series = $fk_series;
        $this->fk_alias_owner = $fk_alias_owner;
        $this->isbn = $isbn;
        $this->number = $number;
    }


    public function getName()
    {
        return $this->name;
    }


    public function getPkBook()
    {
        return $this->pk_book;
    }

    public function getIsbn()
    {
        return $this->isbn;
    }

    public function getNumber()
    {
        return $this->number;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function setPkBook($pk_book)
    {
        $this->pk_book = $pk_book;
    }

    public function setIsbn($isbn)
    {
        $this->isbn = $isbn;
    }

    public function setNumber($number)
    {
        $this->number = $number;
    }

    public function toXML()
    {
        $result = '<book>';
        $result = $result . '<pk_book>' . $this->getPkBook() . '</pk_book>';
        $result = $result . '<isbn>' . $this->getIsbn() . '</isbn>';
        $result = $result . '<name>' . $this->getName() . '</name>';
        $result = $result . '<number>' . $this->getNumber() . '</number>';
        $result = $result . '<fk_series>' . $this->getFk_series() . '</fk_series>';
        $result = $result . '<fk_alias_owner>' . $this->getFk_alias_owner() . '</fk_alias_owner>';
        $result = $result . '</book>';
        return $result;
    }

    /**
     * @return mixed
     */
    public function getFk_series()
    {
        return $this->fk_series;
    }

    /**
     * @param mixed $fk_Series 
     * @return self
     */
    public function setFk_series($fk_Series): self
    {
        $this->fk_series = $fk_Series;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getFk_alias_owner()
    {
        return $this->fk_alias_owner;
    }

    /**
     * @param mixed $fk_alias_owner 
     * @return self
     */
    public function setFk_alias_owner($fk_alias_owner): self
    {
        $this->fk_alias_owner = $fk_alias_owner;
        return $this;
    }
}
