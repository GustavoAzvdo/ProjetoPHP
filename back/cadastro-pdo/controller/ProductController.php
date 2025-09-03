<?php

require_once __DIR__ . '/../db/ProductTable.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$procductTable = new ProductTable();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['name_pro']) && isset($data['value_pro']) && isset($data['date_pro'])) {
        $name = $data['name_pro'];
        $value = $data['value_pro'];
        $date = $data['date_pro'];
        $result = $procductTable->createProduct($name, $value, $date);

        if ($result) {
            http_response_code(201);
            echo json_encode(['message' => 'Product created successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to create product']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid input']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($_GET)) {
    $result = $procductTable->getAllProducts();

    if ($result) {
        http_response_code(200);
        echo json_encode($result);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'No products found']);
    }
}


if ($_SERVER['REQUEST_METHOD']  === 'GET' && (isset($_GET['name_pro']) || isset($_GET['value_pro']) || isset($_GET['date_pro']))) {
    $filters =  [
        'name_pro' => isset($_GET['name_pro']) ?? null,
        'value_pro' => isset($_GET['value_pro']) ?? null,
        'date_pro' => isset($_GET['date_pro']) ?? null,
    ];

    $result = $procductTable->getFilterdProducts($filters);

    if ($result) {
        http_response_code(200);
        echo json_encode($result);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'No products found']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id_pro']) && isset($data['name_pro']) && isset($data['value_pro']) && isset($data['date_pro'])) {
        $id = $data['id_pro'];
        $name = $data['name_pro'];
        $value = $data['value_pro'];
        $date = $data['date_pro'];

        $result = $procductTable->putProductById($id, $name, $value, $date);

        if ($result) {
            http_response_code(200);
            echo json_encode(['message' => 'Product updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to update product']);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id_pro'])) {
    $id = intval($_GET['id_pro']);
    $result = $procductTable->deleteProductById($id);

    if ($result) {
        http_response_code(200);
        echo json_encode(['message' => 'Product deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to delete product']);
    }
}
