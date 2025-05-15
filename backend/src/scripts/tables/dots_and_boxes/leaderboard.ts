export const createLeaderboardTable = `
CREATE TABLE IF NOT EXISTS dots_and_boxes.leaderboard (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES core.users(id) ON DELETE CASCADE,
    total_wins INT DEFAULT 0,
    total_losses INT DEFAULT 0,
    total_games INT DEFAULT 0,
    last_game TIMESTAMP
);
`;
