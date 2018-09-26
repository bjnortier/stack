ALTER TABLE pancakes ADD COLUMN "ready" BOOLEAN NOT NULL DEFAULT false;
INSERT INTO migrations ("migratedAt", "version") VALUES (NOW(), 2);
