# 🛒 Sistema de Cadastro de Produtos

Este projeto é um **sistema de cadastro de produtos** desenvolvido em **PHP (backend)** e **React com TypeScript + Material UI (frontend)**.  
O sistema utiliza um **banco de dados MySQL** para armazenar os produtos cadastrados.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: React + TypeScript + Material UI  
- **Backend**: PHP 8.3.14
- **Banco de Dados**: MySQL  
- **Comunicação**: Axios para requisições HTTP  

---

## ⚙️ Funcionalidades

- Cadastro de produtos  
- Listagem de produtos  
- Edição de produtos  
- Exclusão de produtos  
- Integração frontend ↔ backend via API  

---

## 📦 Como Executar

### 🔹 Backend (PHP)
⚠️ Certifique-se que seu PHP esteja na versão 8.3.14!

Caso não esteja:
- ➡️ Acesse e faça os comandos dentro da pasta `back`;
- ➡️ Quando for iniciar o server no terminal, use o local onde esta o seu php.exe na versao 8.3.14;
- ➡️ Ex: C:\wamp64\bin\php\php8.3.14\php.exe) -S localhost:8080 -t .
  
1. Configure o servidor PHP (Apache/Nginx).  
2. Configure o banco de dados MySQL:  
   - Crie o banco.  
   - Importe o arquivo `pdo_php.sql`  
3. Atualize as credenciais do banco no arquivo de conexão PHP.  

### 🔹 Frontend (React + TypeScript)
1. Acesse a pasta `front`.  
2. Instale as dependências:  
   ```bash
   npm install
