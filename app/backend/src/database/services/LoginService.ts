// import bcryptCompare from 'src/utils/Bcrypt';
import bcryptCompare from '../../utils/Bcrypt';
import UserLogin from '../../interfaces/User';
import Users from '../models/Users';

class LoginService {
  login = async (user: UserLogin) => {
    const result = await Users.findOne({ where: { username: user.username } });
    const compare = bcryptCompare(user.password, result!.password);

    return compare;
  };
}

export default LoginService;
