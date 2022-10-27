import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Match from '../database/models/Match';
import { allMatches, inProgressMatches, newMatch, outOfProgressMatches }from './mocks/MatchMock';
import { userValidLogin } from './mocks/LoginMocks';
import { request } from 'http';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando metodo get da rota /matches', function() {
  let chaiHttpResponse: Response;

  afterEach(() => (Match.findAll as sinon.SinonStub).restore());

  it('Testa se a rota /matches sem a query InProgress retorna todos os times', async function() {
    sinon.stub(Match, 'findAll').resolves(allMatches as unknown as Match[]);

    chaiHttpResponse = await chai
    .request(app)
    .get('/matches')

    expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
    expect(chaiHttpResponse.status).to.be.eq(200);
  })

  it('Testa se a rota /matches com query true retorna todas as partidas em progresso', async function() {
    sinon.stub(Match, 'findAll').resolves(inProgressMatches as unknown as Match[]);

    chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=true');

    expect(chaiHttpResponse.body).to.be.deep.eq(inProgressMatches);
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Testa se a rota /matches com query false retorna todas as partidas finalizadas', async function() {
    sinon.stub(Match, 'findAll').resolves(outOfProgressMatches as unknown as Match[]);

    chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=false');

    expect(chaiHttpResponse.body).to.be.deep.eq(outOfProgressMatches);
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});

describe('Testando metodo post da rota /matches', function () {
  let chaiHttpResponse: Response;
  it('Testa se é possivel cadastrar partida com sucesso', async function() {
    const { body: { token } } = await chai
    .request(app)
    .post('/login')
    .send(userValidLogin);

    sinon.stub(Match, 'create').resolves(newMatch as Match);

    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set("authorization", token)
    .send(newMatch);

    expect(chaiHttpResponse.status).to.be.eq(201);
    expect(chaiHttpResponse.body).to.be.deep.eq(newMatch);

    (Match.create as sinon.SinonStub).restore();
  });
});

describe('Testando método put da rota /matches/:id/finished', function() {
  let chaiHttpResponse: Response;
  it('Testa se é possível atualizar o campo inProgress de uma partida', async function() {
    sinon.stub(Match, 'update');
    chaiHttpResponse = await chai
    .request(app)
    .put('/matches/1/finished')

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" });
  });
})