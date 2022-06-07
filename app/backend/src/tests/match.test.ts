import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { Response } from 'superagent';

import { matchesMock } from './mocks';

const { expect } = chai;

chai.use(chaiHttp);

let chaiResponse: Response;

describe('Verificando GET /matches', async () => {
  before(async () => {
    sinon.stub(Match, "findAll").resolves(matchesMock.arrayMatchesMockInitial as Match[])
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  });

  it('Retorna status 200, caso retorne toda as partidas(matches).', async () => {
    chaiResponse = await chai
    .request(app)
    .get('/matches')
    .send();

    expect(chaiResponse.status).to.be.equal(200);
  })

  it('Retorna todas as partidas(matches)', async () => {
    chaiResponse = await chai
    .request(app)
    .get('/matches')
    .send();

    expect(chaiResponse.body).to.be.a('array');
    expect(chaiResponse.body[0]).to.be.property('id');
    expect(chaiResponse.body[0]).to.be.property('homeTeam');
    expect(chaiResponse.body[0]).to.be.property('homeTeamGoals');
    expect(chaiResponse.body[0]).to.be.property('awayTeam');
    expect(chaiResponse.body[0]).to.be.property('homeTeamGoals');
    expect(chaiResponse.body[0]).to.be.property('inProgress');
  })
});
