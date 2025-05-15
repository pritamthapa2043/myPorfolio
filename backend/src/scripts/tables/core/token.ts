export const createTokenTable = `
CREATE TABLE IF NOT EXISTS core.tokens (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES core.users(id) ON DELETE CASCADE,
    refresh_token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
