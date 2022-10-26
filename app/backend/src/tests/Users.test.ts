import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/Users'
import {userMock, 
  userValidLogin,
  userInvalidLogin,
  loginWithoutEmail,
  loginWithoutPass,
  expectedRole} from './mocks/LoginMocks';
chai.use(chaiHttp);

const { expect } = chai;


describe('Testando rota /login', function() {
  let chaiHttpResponse: Response;
  afterEach(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    });

  it('Testa se é possivel fazer login com suceso', async function() {
    sinon.stub(Users, "findOne").resolves(userMock as Users)

    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(userValidLogin);

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

  it('Testa se ao tentar fazer login com informações inválidas, retorna um erro', async function() {
    sinon.stub(Users, "findOne").resolves(userMock as Users);

    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send(userInvalidLogin)

    const errMessage =  "Incorrect email or password";

    expect(chaiHttpResponse.body.message).to.be.equal(errMessage)
    expect(chaiHttpResponse.status).to.be.equal(401);
  })

  it('Testa se ao tentar fazer login sem campo email, retorna erro', async function() {
    sinon.stub(Users, "findOne").resolves(userMock as Users);

    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send(loginWithoutEmail)

    const errMessage = "All fields must be filled";

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal(errMessage);
  })

  it('Testa se ao tentar fazer login sem campo password, retorna erro', async function() {
    sinon.stub(Users, "findOne").resolves(userMock as Users);

    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send(loginWithoutPass)

    const errMessage = "All fields must be filled";

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal(errMessage);
  })
})

describe('Testa rota /login/validate', function() {
  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  });
  
  let chaiHttpResponse: Response;

  it('Testa se é retornado a role do usuario na rota /login/validate', async function() {
    const { body: { token } } = await chai.request(app)
    .post('/login')
    .send(userValidLogin);

    sinon.stub(Users, "findOne").resolves(userMock as Users);
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')
    .set("authorization", token)
    .send({})

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(expectedRole);
  })
})