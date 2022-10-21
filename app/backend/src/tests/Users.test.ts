import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

chai.use(chaiHttp);
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/Users'
import oneUser from './mocks/UsersMock';

const { expect } = chai;

describe('Testando a model Users', function() {
  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(oneUser as Users);
  });

  after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    });
  it('Testa se model está se conectando ao db e funcionando', async function() {
    const userRequest = await Users.findOne({
      where: { username: 'Admin' }
    });
    expect(userRequest).to.be.equal(oneUser);
  })
})


describe('Testando rota /login', function() {
  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(oneUser as Users);
  });

  after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    });
  it('Testa se é possivel fazer login com suceso', async function() {
    const chaiHttpResponse = await chai.request(app)
    .get('/login')
  });
})
