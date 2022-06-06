import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { Response } from 'superagent';

import userMock from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiResponse: Response 

describe('Verificando POST /login', () => {

  before(async () => {
    sinon.stub(User, "findOne").resolves(userMock as User)
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  // informações do usuário
  it('Retorna status 200', async () => {
    chaiResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "user@user.com",
      "password": "secret_user"
    });

    expect(chaiResponse.status).to.be.equal(200);
  })

  it('Retorna as informações do usuário', async () => {
    chaiResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "user@user.com",
      "password": "secret_user"
    });

    expect(chaiResponse.body).to.have.property('user')
  });

  // caso email seja invalido
  it('Retorna status 401 caso email seja invalido', async () => {
    chaiResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "user$user.com",
      "password": "secret_user"
    });

    expect(chaiResponse.status).to.be.equal(401);
  })

  it('Retorna mensagem de erro caso email seja invalido', async () => {
    chaiResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "user$user.com",
      "password": "secret_user"
    });

    expect(chaiResponse.body.message).to.be.equal("Incorrect email or password");
  })

  // caso a senha seja invalido
  it('Retorna status 401 caso a senha seja invalido', async () => {
    chaiResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "user@user.com",
      "password": "public_user"
    });
  
    expect(chaiResponse.status).to.be.equal(401);
  })

  it('Retorna mensagem de erro caso a senha seja invalido', async () => {
    chaiResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "user$user.com",
      "password": "public_user"
    });

    expect(chaiResponse.body.message).to.be.equal("Incorrect email or password");
  })

    // campo email não existe
  it('Retorna status 400 caso não exista o campo email', async () => {
    chaiResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "password": "secret_user"
    });
  
    expect(chaiResponse.status).to.be.equal(400);
  })


  it('Retorna mensagem de erro caso o campo email não exista', async () => {
    chaiResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "password": "public_user"
    });

    expect(chaiResponse.body.message).to.be.equal("All fields must be filled");
  })

  // campo password não existe
  it('Retorna status 400 caso não exista o campo password', async () => {
    chaiResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "user$user.com"
    });
  
    expect(chaiResponse.status).to.be.equal(400);
  })

  it('Retorna mensagem de erro caso o campo password não exista', async () => {
    chaiResponse = await chai
    .request(app)
    .post('/login')
    .send({
      "email": "user$user.com",

    });

    expect(chaiResponse.body.message).to.be.equal("All fields must be filled");
  })
})

describe('Verificando GET /login/validate', async () => {
  before(async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);
    sinon.stub(jwt, 'verify').resolves({ user: 'user@user.com' });
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Retorna status 200 caso login foi autenticado com sucesso', async () => {
    chaiResponse = await chai
    .request(app)
    .get('/login/validate')
    .set('authorization', 'mock_token')
    .send();

    expect(chaiResponse.status).to.be.equal(200);
  })
})