export const createTicTacToeLeaderboard = `
CREATE TABLE tic_tac_toe.leaderboard (
  user_id INT PRIMARY KEY REFERENCES core.users(id),
  username TEXT NOT NULL,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  draws INT DEFAULT 0,
  points INT DEFAULT 0,        
  games_played INT DEFAULT 0, 
  last_updated TIMESTAMP DEFAULT NOW()  
);
`;
