<?php
require_once __DIR__ . '/cadastro-pdo/db/db.php';

$db = new DBConnection();
$conn = $db->getConnection();

if ($conn) {
    echo "Conexão bem-sucedida!";
} else {
    echo "Falha na conexão!";
}
?>
