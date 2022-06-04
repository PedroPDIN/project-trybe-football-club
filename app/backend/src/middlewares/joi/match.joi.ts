import * as Joi from 'joi';

const matchSchema = Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().required(),
  homeTeamGoals: Joi.number().required(),
  awayTeamGoals: Joi.number().required(),
  inProgress: Joi.boolean().required(),
});

export default matchSchema;
