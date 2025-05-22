export const createTicMovesTable = `
CREATE TABLE IF NOT EXISTS tic_tac_toe.moves (
  id SERIAL PRIMARY KEY,
  game_id INT NOT NULL REFERENCES tic_tac_toe.games(id) ON DELETE CASCADE,
  player_id INT NOT NULL REFERENCES core.users(id),
  row INT NOT NULL CHECK (row BETWEEN 0 AND 2),
  col INT NOT NULL CHECK (col BETWEEN 0 AND 2),
  move_number INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (game_id, row, col)
);
`;
