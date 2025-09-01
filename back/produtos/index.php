<?php
header("Content-Type: application/json");
require '../db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

switch($method) {
    case 'GET': // Listar produtos
        $stmt = $pdo->query("SELECT * FROM produtos");
        $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($produtos);
        break;

    case 'POST': // Criar produto
        $sql = "INSERT INTO produtos (nome,categoria,preco,estoque,data_validade,descricao) VALUES (?,?,?,?,?,?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['nome'],
            $input['categoria'],
            $input['preco'],
            $input['estoque'],
            $input['data_validade'],
            $input['descricao']
        ]);
        echo json_encode(["success" => true]);
        break;

    case 'PUT': // Atualizar produto
        $sql = "UPDATE produtos SET nome=?, categoria=?, preco=?, estoque=?, data_validade=?, descricao=? WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['nome'],
            $input['categoria'],
            $input['preco'],
            $input['estoque'],
            $input['data_validade'],
            $input['descricao'],
            $input['id']
        ]);
        echo json_encode(["success" => true]);
        break;

    case 'DELETE': // Deletar produto
        $sql = "DELETE FROM produtos WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$input['id']]);
        echo json_encode(["success" => true]);
        break;

    default:
        echo json_encode(["error" => "Método não permitido"]);
}
?>
