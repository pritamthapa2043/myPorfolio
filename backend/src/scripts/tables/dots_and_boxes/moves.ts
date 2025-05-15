export const createMovesTable = `
CREATE TABLE IF NOT EXISTS dots_and_boxes.moves (
    id SERIAL PRIMARY KEY,
    match_id INT REFERENCES dots_and_boxes.matches(id) ON DELETE CASCADE,
    player_id INT REFERENCES core.users(id) ON DELETE CASCADE,
    start_x INT NOT NULL, 
    start_y INT NOT NULL,
    end_x INT NOT NULL, 
    end_y INT NOT NULL,
    move_order INT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
