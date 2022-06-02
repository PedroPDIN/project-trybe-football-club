import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './Match';

export default class Team extends Model {
  public id!: number;
  public teamName!: string;
}

Team.init({
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'id', as: 'home_team' });
Team.hasMany(Match, { foreignKey: 'id', as: 'away_team' });
