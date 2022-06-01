import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Match extends Model {
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Match.init({
  homeTeam: DataTypes.NUMBER,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeam: DataTypes.NUMBER,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,

}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});
