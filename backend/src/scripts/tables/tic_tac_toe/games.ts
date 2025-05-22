export const createTicTacToeGames = `
CREATE Table if not exists tic_tac_toe.games(
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL CHECK (status IN ('waiting', 'in_progress', 'completed')),
    player_x_id INTEGER REFERENCES core.users(id),
    player_o_id INTEGER REFERENCES core.users(id),
    winner_id INTEGER REFERENCES core.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);`;

export const alterTicTacToeGamesTable = `
Alter Table tic_tac_toe.games 
add column room_id varchar(10) unique NOT NULL;
`;
