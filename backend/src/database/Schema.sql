--Memory Game App Initial SQL 
BEGIN;

-- ==============================
-- user table
-- ==============================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ==============================
-- games table
-- ==============================
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_name VARCHAR(60) NOT NULL UNIQUE,
    game_description TEXT NOT NULL
);

-- =============================
-- game_scores
-- =============================
CREATE TABLE game_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    game_id UUID NOT NULL,
    score INTEGER NOT NULL,
    duration_second INT,
    level_reached INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    CONSTRAINT fk_users FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_games FOREIGN KEY (game_id)
        REFERENCES games(id)
        ON DELETE CASCADE
    
);

-- ===========================
-- INDEXES
-- ===========================
CREATE INDEX idx_game_scores_user ON game_scores(user_id);
CREATE INDEX idx_game_scores_game ON game_scores(game_id);

COMMIT;