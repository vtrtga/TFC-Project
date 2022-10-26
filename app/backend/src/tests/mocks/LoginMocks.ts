
const userMock =  {
  id: 1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

const userValidLogin = {
  email: 'user@user.com',
  password: 'secret_user',
}

const userInvalidLogin = {
  email: 'invalid@invalid.com',
  password: 'invalid_password',
}

const loginWithoutEmail = {
  password: 'secret_user',
}

const loginWithoutPass = {
  email: 'user@user.com',
}

const expectedRole = {
  role: 'user',
}

export {userMock, userValidLogin, userInvalidLogin, loginWithoutEmail, loginWithoutPass, expectedRole};