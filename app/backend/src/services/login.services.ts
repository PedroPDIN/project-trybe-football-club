import * as bcrypt from 'bcrypt';
import User from '../database/models/User';
import generateToken from './generateToken';
import { ILoginUser, IUser } from '../interfaces';

type Login = {
  email: string,
  password: string,
};

export default class LoginService {
  public login = async (info: Login): Promise<ILoginUser | null> => {
    const { email, password } = info;

    const user = await User.findOne({ where: { email } }) as IUser;
    if (!user) return null;

    const criptoPassword = await bcrypt.compare(password, user.password);
    // console.log(criptoPassword);
    if (!criptoPassword) return null;

    const token = generateToken(email);

    const { id, username, role, email: emailUser } = user;

    return {
      user: {
        id,
        username,
        role,
        emailUser,
      },
      token,
    };
  };
}
