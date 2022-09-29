// P/(J*3)*100
const average = (points: number, games: number) => ((points / (games * 3)) * 100).toFixed(2);

export default average;
