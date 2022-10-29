const homeTeamQuery = `SELECT 
team_name as name, 
(SUM(home_team_goals>away_team_goals) * 3) + SUM(home_team_goals = away_team_goals) AS totalPoints,
COUNT(*) as totalGames,
SUM(home_team_goals > away_team_goals) as totalVictories,
SUM(home_team_goals = away_team_goals) as totalDraws,
SUM(away_team_goals > home_team_goals) as totalLosses,
SUM(home_team_goals) as goalsFavor,
SUM(away_team_goals) as goalsOwn,
(SUM(home_team_goals) - SUM(away_team_goals)) as goalsBalance,
ROUND((((SUM(home_team_goals>away_team_goals) * 3) +
SUM(home_team_goals = away_team_goals)) / (COUNT(*) * 3)) * 100, 2) AS efficiency
FROM matches as m
JOIN teams as t
ON t.id = m.home_team
WHERE in_progress = 0
GROUP BY team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export default homeTeamQuery;
