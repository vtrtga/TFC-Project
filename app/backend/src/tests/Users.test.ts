import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/Users'
import {userMock, userLoginMock} from './mocks/UsersMock';
chai.use(chaiHttp);

const { expect } = chai;


describe('Testando rota /login', function() {
  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userMock as Users);
  });

  after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    });
  it('Testa se é possivel fazer login com suceso', async function() {
    let chaiHttpResponse: Response;
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send(userLoginMock);

    expect(chaiHttp).to.be.eq(userMock);
  });
})
