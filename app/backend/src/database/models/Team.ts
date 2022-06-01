import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './Match';

export default class Team extends Model {
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

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'id' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'id' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'home_team' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'away_team' });
