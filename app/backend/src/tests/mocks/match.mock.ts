const arrayMatchesMockInitial = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 10,
    inProgress: true,
  },
  {
    id: 2,
    homeTeam: 12,
    homeTeamGoals: 3,
    awayTeam: 7,
    awayTeamGoals: 20,
    inProgress: false,
  }
];

const arrayMatchesMockFinal = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 10,
    inProgress: true,
    teamHome: { teamName: 'Flamengo' },
    teamAway: { teamName: 'Vasco' },
  },
  {
    id: 2,
    homeTeam: 12,
    homeTeamGoals: 3,
    awayTeam: 7,
    awayTeamGoals: 20,
    inProgress: false,
    teamHome: { teamName: 'PSG' },
    teamAway: { teamName: 'Real Madrid' },
  }
];

const matchesMockOneInitial = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 10,
  inProgress: true,
};

const matchesMockOneFinal = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 10,
  inProgress: true,
  teamHome: { teamName: 'flamengo' },
  teamAway: { teamName: 'vasco' },
};

const matchesMockOneUpdate = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 10,
  inProgress: false,
};

const matchesMock = {
  arrayMatchesMockInitial,
  arrayMatchesMockFinal,
  matchesMockOneInitial,
  matchesMockOneFinal,
  matchesMockOneUpdate,
}

export default matchesMock;
