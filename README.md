# qualita-compliance
# Instruções para rodar:
- Ter Java 11 e Gradle instalados.
- Rodar o servidor mongoDB local (Pode ser usado o comando "mongod" no terminal).
- Rodar a aplicação Spring via linha de comando ou em uma IDE Java (O mesmo vale para os testes unitários e de integração).
- Certificar que o lombok está configurado.

# Rotas da solução divididas por funcionalidade: 
- Funcionário
- Empresa
- Denúncias
- Treinamento


# Funcionário
# POST /funcionario
- Params: Person person
- Role: Admin
- Insere um novo funcionário, enviando um email com a senha gerada para tal.

# DELETE /funcionario
- Params: String cpf
- Role: Admin
- Remove um funcionário pelo cpf.

# PUT /mudar-senha
- Params: String cpf, String password
- Role: Funcionario
- Muda a senha gerada de um funcionário.

# GET /login
- Params: String cpfOrCnpj, String password
- Role: Funcionario/Empresa
- Realiza o login de um funcionário ou empresa.

# POST /funcionario
- Params: Person person
- Role: Admin
- Insere um novo funcionário, enviando um email com a senha gerada para tal.
