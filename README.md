# qualita-compliance
# Instruções para rodar:
- Ter Java 11 e Gradle instalados.
- Rodar o servidor mongoDB local (Pode ser usado o comando "mongod" no terminal).
- Rodar a aplicação Spring via linha de comando ou em uma IDE Java (O mesmo vale para os testes unitários e de integração).
- Certificar que o lombok está configurado.

# Deploy
http://qualitacompliance.com.br/

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

# Empresa
# POST /empresa
- Params: Company company
- Role: Admin
- Insere uma nova empresa, enviando um email com a senha gerada para tal.

# GET /empresa
- Role: Admin
- Retorna todas empresas cadastradas.

# DELETE /empresa
- Params: String cnpj
- Role: Admin
- Remove uma empresa pelo cnpj.

# PUT /validacao
- Params: String moduleId, String cnpj
- Role: Empresa
- Valida um módulo de treinamento.

# Denúncias
# POST /denuncia
- Params: Report report
- Role: -
- Insere uma nova denuncia, podendo ser anonima ou não e mostra o número de protocolo para quem a realizou.

# POST /denuncia/com-anexo
- Params: Report report, List files
- Role: -
- Insere uma nova denuncia (com anexos), podendo ser anonima ou não e mostra o número de protocolo para quem a realizou.

# PUT /denuncia/encaminhamento
- Params: String cnpj, String trackingId, String moreDestinations
- Role: Admin
- Encaminha a denúncia para a empresa e demais envolvidos citados.

# PUT /denuncia/encaminhamento/com-anexo
- Params: String cnpj, String trackingId, String moreDestinations, List files
- Role: Admin
- Encaminha a denúncia (com anexos) para a empresa e demais envolvidos citados.

# PUT /denuncia/resposta-empresa
- Params: String trackingId, ReportAnswer answer
- Role: Empresa
- Responde a uma denúncia na qual foi citada.

# PUT /denuncia/resposta-empresa/com-anexo
- Params: String trackingId, ReportAnswer answer, List files
- Role: Empresa
- Responde a uma denúncia na qual foi citada (com anexos).

# PUT /denuncia/resposta-informante
- Params: String trackingId, ReportAnswer answer
- Role: Admin
- Responde ao informante da denúncia.

# PUT /denuncia/resposta-informante/com-anexo
- Params: String trackingId, ReportAnswer answer, List files
- Role: Admin
- Responde ao informante da denúncia (com anexos).

# GET /denuncia
- Params: int page, int size
- Role: Admin
- Retorna todas as denúncias cadastradas com paginação.

# GET /denuncia/filtro
- Params: String category, String date, String urgent, int page, int size
- Role: Admin
- Retorna todas as denúncias cadastradas com paginação e filtragem de campos.

# GET /denuncia/{trackingId}
- Params: String trackingId
- Role: Admin
- Retorna uma denúncia pelo número de protocolo.

# DELETE /denuncia
- Params: String trackingId
- Role: Admin
- Remove uma denúncia pelo número de protocolo.

# Treinamento
# POST /modulos
- Params: TrainingModule trainingModule
- Role: Admin
- Insere um novo módulo de treinamento.

# POST /modulos/com-anexo
- Params:TrainingModule trainingModule, List files
- Role: Admin
- Insere um novo módulo de treinamento (com anexos).

# GET /modulos
- Params:
- Role: Todos
- Retorna todos módulos cadastrados.

# GET /modulos/{id}
- Params: String id
- Role: Todos
- Retorna um módulo cadastrado pelo id.

# PUT /modulos
- Params: TrainingModule trainingModule
- Role: Admin
- Edita um módulo de treinamento.

# PUT /modulos/anexo
- Params: TrainingModule trainingModule, File file
- Role: Admin
- Insere um anexo a um módulo de treinamento.

# PUT /modulos/comentario
- Params: String trainingModuleId, ModuleComment moduleComment
- Role: Todos
- Insere um comentário em um módulo de treinamento.

# PUT /modulos/resposta-comentario
- Params: String trainingModuleId, String commentId, ModuleComment commentAnswer
- Role: Todos
- Responde um comentário em um módulo de treinamento.

# DELETE /modulos
- Params: String id
- Role: Admin
- Remove um módulo de treinamento pelo id.
