<?php
    class DBConnection {

        protected $connection;

        public function __construct() {
            try {
                $this->connection = new PDO("mysql:host=127.0.0.1;dbname=pdo_php", "root", "");
                $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            } catch(PDOException $e) {
                echo 'ERROR: ' . $e->getMessage();
            }
        }

        public function getConnection() {
            return $this->connection;
        }
    }
?>