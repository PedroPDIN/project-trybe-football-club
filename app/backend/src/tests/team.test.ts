import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { Response } from 'superagent';

import { teamMock } from './mocks';

const { expect } = chai;

chai.use(chaiHttp);

let chaiResponse: Response;

describe('Verificando GET /teams', async () => {
  before(async () => {
    sinon.stub(Team, "findAll").resolves(teamMock.arrayTeamMock as Team[])
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('Retorna status 200, com todos os times', async () => {
    chaiResponse = await chai
    .request(app)
    .get('/teams')
    .send();

    expect(chaiResponse.status).to.be.equal(200)
  })

  it('Retorna todos os times com as propriedades id e teamName', async () => {
    chaiResponse = await chai
    .request(app)
    .get('/teams')
    .send();

    expect(chaiResponse.body[0]).to.be.property('id')
    expect(chaiResponse.body[0]).to.be.property('teamName')
  })
})

describe('Verificando GET /teams/:id', async () => {
  before(async () => {
    sinon.stub(Team, "findOne").resolves(teamMock.teamMockOne as Team)
  });

  after(() => {
    (Team.findOne as sinon.SinonStub).restore();
  });

  it('Retorna status 200, como o time referente ao ID', async () => {
    chaiResponse = await chai
    .request(app)
    .get('/teams/:id')
    .send();

    expect(chaiResponse.status).to.be.equal(200)
  })

  it('Retorna o time referente ao ID', async () => {
    chaiResponse = await chai
    .request(app)
    .get('/teams/:id')
    .send();
    
    expect(chaiResponse.body).to.be.property('id')
    expect(chaiResponse.body).to.be.property('teamName')
  })
})

describe('Verificando Erros GET /teams/:id', async () => {
  before(async () => {
    sinon.stub(Team, "findOne").resolves(null)
  });

  after(() => {
    (Team.findOne as sinon.SinonStub).restore();
  });

  it('Retorna status 404, caso não encontre o ID do time', async () => {
    chaiResponse = await chai
    .request(app)
    .get('/teams/:id')
    .send();

    expect(chaiResponse.status).to.be.equal(404);
  })

  it('Retorna a mensagem de erro, caso não encontre o ID do time', async () => {
    chaiResponse = await chai
    .request(app)
    .get('/teams/:id')
    .send();

    expect(chaiResponse.body.message).to.be.equal('team not found');
  })
})
