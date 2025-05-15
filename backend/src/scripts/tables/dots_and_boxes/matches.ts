export const createMatchesTable = `
CREATE TABLE IF NOT EXISTS dots_and_boxes.matches (
    id SERIAL PRIMARY KEY,
    game_mode VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
    winner_id INT REFERENCES core.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
