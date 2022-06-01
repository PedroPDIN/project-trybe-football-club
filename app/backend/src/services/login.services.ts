import * as bcrypt from 'bcrypt';
import User from '../database/models/User';
import generateToken from './generateToken';
// import ILoginUser from '../interfaces';

type Login = {
  email: string,
  password: string,
};

export default class LoginService {
  public login = async (info: Login) => {
    const { email, password } = info;

    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) return null;

    const criptoPassword = await bcrypt.compare(password, user.password);
    if (!criptoPassword) return null;

    const token = generateToken(email);

    return {
      user,
      token,
    };
  };
}
