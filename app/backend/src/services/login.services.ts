import * as bcrypt from 'bcryptjs';
import { JwtPayload, verify } from 'jsonwebtoken';
import User from '../database/models/User';
import { generateToken, secret } from './generateToken';
import { ILoginUser, IUser } from '../interfaces';

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

  public loginValidate = async (token: string): Promise<string | null> => {
    const { email } = verify(token, secret) as JwtPayload;
    console.log(email);
    const userFind = await User.findOne({ where: { email } }) as IUser;
    if (!userFind) return null;

    return userFind.role;
  };
}
