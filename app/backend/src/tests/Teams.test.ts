import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Teams from '../database/models/Teams';
import allTeamsMock from './mocks/TeamsMock';


chai.use(chaiHttp);

const { expect } = chai;


describe('Testando a rota /teams', function() {
  let chaiHttpResponse: Response;

  it('Testa se o metodo get na rota /teams retorna todos os times', async function() {
    sinon.stub(Teams, 'findAll').resolves(allTeamsMock as Teams[]);
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams')

    expect(chaiHttpResponse.body).to.be.deep.eq(allTeamsMock);
    expect(chaiHttpResponse.status).to.be.eq(200);

    (Teams.findAll as sinon.SinonStub).restore()
  });

  it('Testa se a rota /teams/1 retorna o respectivo time de id 1', async function() {
    sinon.stub(Teams, 'findByPk').resolves(allTeamsMock[0] as Teams);

    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/1');

    expect(chaiHttpResponse.body).to.be.deep.eq(allTeamsMock[0]);
    expect(chaiHttpResponse.status).to.be.eq(200);

    (Teams.findByPk as sinon.SinonStub).restore()
  });
});
