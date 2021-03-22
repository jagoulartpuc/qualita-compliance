# qualita-compliance
# Instruções para rodar:
- Ter Java 11 e Gradle instalados.
- Rodar o servidor mongoDB local (Pode ser usado o comando "mongod" no terminal).
- Rodar a aplicação Spring via linha de comando ou em uma IDE Java (O mesmo vale para os testes unitários e de integração).
- Certificar que o lombok está configurado.

# Rotas da solução: 
# POST /funcionario
- Params:
- Role:
- Insere um novo funcionário, enviando um email com a senha gerada para tal.

# DELETE /funcionario
- Remove um funcionário pelo id.

# POST /funcionario
- Insere um novo funcionário, enviando um email com a senha gerada para tal.
