export const createBoxesTable = `
CREATE TABLE IF NOT EXISTS dots_and_boxes.boxes (
    id SERIAL PRIMARY KEY,
    match_id INT REFERENCES dots_and_boxes.matches(id) ON DELETE CASCADE,
    owner_id INT REFERENCES core.users(id) ON DELETE SET NULL,
    top_x INT NOT NULL,
    top_y INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
