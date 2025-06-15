-- Create table: User
CREATE TABLE "User" (
    id TEXT PRIMARY KEY DEFAULT(lower(hex(randomblob (16)))),
    name TEXT,
    email TEXT UNIQUE,
    emailVerified TEXT,
    image TEXT,
    createdAt TEXT NOT NULL DEFAULT(datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT(datetime('now'))
);

-- Create table: Account
CREATE TABLE "Account" (
    id TEXT PRIMARY KEY DEFAULT(lower(hex(randomblob (16)))),
    userId TEXT NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    providerAccountId TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    createdAt TEXT NOT NULL DEFAULT(datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT(datetime('now')),
    FOREIGN KEY (userId) REFERENCES "User" (id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_account_provider_providerAccountId ON "Account" (provider, providerAccountId);

-- Create table: Session
CREATE TABLE "Session" (
    id TEXT PRIMARY KEY DEFAULT(lower(hex(randomblob (16)))),
    sessionToken TEXT UNIQUE NOT NULL,
    userId TEXT NOT NULL,
    expires TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT(datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT(datetime('now')),
    FOREIGN KEY (userId) REFERENCES "User" (id) ON DELETE CASCADE
);

-- Create table: VerificationToken
CREATE TABLE "VerificationToken" (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires TEXT NOT NULL
);

CREATE UNIQUE INDEX idx_verification_identifier_token ON "VerificationToken" (identifier, token);

-- Create table: Authenticator
CREATE TABLE "Authenticator" (
    credentialID TEXT NOT NULL,
    userId TEXT NOT NULL,
    providerAccountId TEXT NOT NULL,
    credentialPublicKey TEXT NOT NULL,
    counter INTEGER NOT NULL,
    credentialDeviceType TEXT NOT NULL,
    credentialBackedUp INTEGER NOT NULL,
    transports TEXT,
    PRIMARY KEY (userId, credentialID),
    FOREIGN KEY (userId) REFERENCES "User" (id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_authenticator_credentialID ON "Authenticator" (credentialID);

INSERT INTO
    "User" (
        id,
        name,
        email,
        emailVerified,
        image,
        createdAt,
        updatedAt
    )
VALUES (
        'u1', -- id fixo
        'Alice',
        'alice@example.com',
        NULL,
        NULL,
        datetime('now'),
        datetime('now')
    ) ON CONFLICT (email) DO
UPDATE
SET
    name = excluded.name,
    updatedAt = datetime('now');

-- Bob
INSERT INTO
    "User" (
        id,
        name,
        email,
        emailVerified,
        image,
        createdAt,
        updatedAt
    )
VALUES (
        'u2',
        'Bob',
        'bob@example.com',
        NULL,
        NULL,
        datetime('now'),
        datetime('now')
    ) ON CONFLICT (email) DO
UPDATE
SET
    name = excluded.name,
    updatedAt = datetime('now');

-- Carol
INSERT INTO
    "User" (
        id,
        name,
        email,
        emailVerified,
        image,
        createdAt,
        updatedAt
    )
VALUES (
        'u3',
        'Carol',
        'carol@example.com',
        NULL,
        NULL,
        datetime('now'),
        datetime('now')
    ) ON CONFLICT (email) DO
UPDATE
SET
    name = excluded.name,
    updatedAt = datetime('now');