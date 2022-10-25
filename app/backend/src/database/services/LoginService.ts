// import bcryptCompare from 'src/utils/Bcrypt';
import UserLogin from '../../interfaces/User';
import Users from '../models/Users';

class LoginService {
  login = async (user: UserLogin) => {
    console.log(user.email);
    const result = await Users.findOne({ where: { email: user.email } });
    if (!result) return undefined;

    return result;
  };
}

export default LoginService;
