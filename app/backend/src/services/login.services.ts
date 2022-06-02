import * as bcrypt from 'bcrypt';
import User from '../database/models/User';
import generateToken from './generateToken';
import { ILoginUser, IUser } from '../interfaces';
import { userInfo } from 'os';

type Login = {
  email: string,
  password: string,
};

export default class LoginService {
  public login = async (info: Login): Promise<ILoginUser | null> => {
    const userFind = await User.findOne({ where: { email: info.email } }) as IUser;
    if (!userFind) return null;

    const criptoPassword = await bcrypt.compare(info.password, userFind.password);
    if (!criptoPassword) return null;

    const token = generateToken(info.email);

    const { id, username, role, email } = userFind;
    return {
      user: {
        id,
        username,
        role,
        email,
      },
      token,
    };
  };
}
