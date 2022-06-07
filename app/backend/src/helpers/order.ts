import { ILeaderBoard } from '../interfaces';

const compare = (list: ILeaderBoard[]) => { // logica inspirada no projeto do Leandro Augusto Nogueira turma 16 (forEver);
  const l1 = list.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn
  ));

  return l1;
};

export default compare;
