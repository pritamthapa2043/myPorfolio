export const createUserTable = `
create table if not exists core.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roles TEXT[] DEFAULT ARRAY['player'],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const alterUserTable = `
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'deleted_at'
  ) THEN
    ALTER TABLE core.users ADD COLUMN deleted_at TIMESTAMP DEFAULT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE core.users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
  END IF;
END $$;
`;
