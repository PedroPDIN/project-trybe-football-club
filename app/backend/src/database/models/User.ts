import { Model, DataTypes } from 'sequelize';

import db from '.';

export default class User extends Model {
  public userName: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init({
  userName: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});
