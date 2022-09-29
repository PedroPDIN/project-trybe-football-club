# Trybe Futebol Clube

### O TFC é um site informativo sobre partidas e classificações de futebol!

#### O projeto tem como finalidade construir uma API e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

<details>
  <summary><strong>Instalação do projeto</strong></summary><br />
  1. Clone o repositório

  -`git clone git@github.com:PedroPDIN/project-trybe-football-club.git`.
  - Entre na pasta do repositório que você acabou de clonar:
      * `cd project-trybe-football-club`

  2. Instale as dependências [**Caso existam**]
    * `npm install`

</details>


<details>
  <summary><strong>Informações do Projeto</strong></summary>
  <br />
  <p>
    A construção do projeto tem como o foco criar um back-end dockerizado utilizando modelagem de dados através do Sequelize. O desenvolvimento repeita as negócio providas no projeto e a API sendo utilizada por um front-end já desenvolvida pelo grupo da TRYBE.
  </p>

  <h3>Detalhes da API</h3>

  <p>
    Adicionar uma partida é necessário pessoa usuária e senha, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.
  </p>

  <p>
    O back-end possui regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.
  </p>

</details>

<details>
  <summary><strong>⚠️ Configurações mínimas nas máquinas locais para rodar o projeto</strong></summary><br />

  - Sistema Operacional Distribuição Unix
  - Node versão 16  
  - Docker
  - Docker-compose versão 1.29.2

  * Você pode subir ou descer uma aplicação do compose, utilizando os scripts `compose:up`, `compose:down`;
</details>

<details>
  <summary><strong>Endpoints (Rotas)</strong></summary><br />

  1. Login (POST): `/login`
      - Corpo da requisição:
        ~~~
        {
          "email": "string",
          "password": "string"
        }
        ~~~
      - Saída:
        ~~~
        {
          "user": {
            "id": 1,
            "username": "Admin",
            "role": "admin",
            "email": "admin@admin.com"
          },
          "token": "123.456.789" // Aqui deve ser o token gerado pelo backend.
        }
        ~~~
    
  2. Verificar o tipo de usuário (GET) que efetuou o login: `/login/validate`
      - IMPORTANTE: Ele deve receber no `header` com parâmetro `authorization` onde ficará o token gerado no login.
      - Saída (response):
        - A Saída contém o `role` do usuário.
          ~~~
          "admin"
          ~~~

  3. Listagem de todos os times (GET): `/teams`
      - Saída (response):
        ~~~
        [
	        {
	        	"id": 1,
	        	"teamName": "Avaí/Kindermann"
	        },
	        {
	        	"id": 2,
	        	"teamName": "Bahia"
	        },
	        {
	        	"id": 3,
	        	"teamName": "Botafogo"
	        },
	        ...
        ]
        ~~~

  4. Busca dados de um time específico (GET): `/teams/:id`
      - Saída (response):
        ~~~
        {
	        "id": 5,
	        "teamName": "Cruzeiro"
        }
        ~~~

  5. Listagem de todas as partidas (GET): `/matches`
      - Saída (response):
        ~~~
        [
          {
            "id": 1,
            "homeTeam": 16,
            "homeTeamGoals": 1,
            "awayTeam": 8,
            "awayTeamGoals": 1,
            "inProgress": false,
            "teamHome": {
              "teamName": "São Paulo"
            },
            "teamAway": {
              "teamName": "Grêmio"
            }
          },
          ...
          {
            "id": 41,
            "homeTeam": 16,
            "homeTeamGoals": 2,
            "awayTeam": 9,
            "awayTeamGoals": 0,
            "inProgress": true,
            "teamHome": {
              "teamName": "São Paulo"
            },
            "teamAway": {
              "teamName": "Internacional"
            }
          }
        ]
        ~~~

  6. Criação de uma nova partida (POST): `/matches`
      - IMPORTANTE: A partida só pode ser criada com token JWT validado;
      - Corpo da requisição:
        ~~~
        {
          "homeTeam": 16, // O valor deve ser o id do time
          "awayTeam": 8, // O valor deve ser o id do time
          "homeTeamGoals": 2,
          "awayTeamGoals": 2,
          "inProgress": true // a partida deve ser criada como em progresso
        }
        ~~~

  7. Finalizar e salvar uma partida. Com isso alterando o status `inProgress` para false no banco de dados (PATCH): `/matches/:id/finish`
      - Saída (response):
        ~~~
        { "message": "Finished" }
        ~~~

  8. Atualizar partidas em andamento (PATCH): `/matches/:id`
      - Corpo da requisição:
        ~~~
        {
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        }
        ~~~

  9. Filtrar a classificações dos times, quando mandantes, com os dados iniciais do banco de dados (GET): `/leaderboard/home`
      - Saída (response):
        ~~~
        [
          {
            "name": "Palmeiras",
            "totalPoints": 13,
            "totalGames": 5,
            "totalVictories": 4,
            "totalDraws": 1,
            "totalLosses": 0,
            "goalsFavor": 17,
            "goalsOwn": 5,
            "goalsBalance": 12,
            "efficiency": 86.67
          },
          {
            "name": "Corinthians",
            "totalPoints": 12,
            "totalGames": 5,
            "totalVictories": 4,
            "totalDraws": 0,
            "totalLosses": 1,
            "goalsFavor": 12,
            "goalsOwn": 3,
            "goalsBalance": 9,
            "efficiency": 80
          },
          {
            "name": "Santos",
            "totalPoints": 11,
            "totalGames": 5,
            "totalVictories": 3,
            "totalDraws": 2,
            "totalLosses": 0,
            "goalsFavor": 12,
            "goalsOwn": 6,
            "goalsBalance": 6,
            "efficiency": 73.33
          },
          ...
        ]
        ~~~

</details>

## Status do Projeto - :construction: Incompleto :construction:
  * Criação do endpoint (rota): `/leaderboard/away`
      - Filtrar a classificações dos times, quando visitantes.
  * Finalizar a cobertura de testes no projeto.

#### :warning: Importante :warning:: O grupo Trybe foi responsável por realizar o inicio do projeto (e também os commits iniciais), mas precisamente a estrutura do projeto, configuração dos tests para a avaliação do projeto e todo o front-end, pois o foco desse projeto é apenas o back-end.
