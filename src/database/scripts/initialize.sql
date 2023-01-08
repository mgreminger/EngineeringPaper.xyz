DROP TABLE IF EXISTS Sheets;
DROP TABLE IF EXISTS NumReads;

PRAGMA foreign_keys = ON;

CREATE TABLE Sheets (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    dataHash TEXT NOT NULL,
    creation TEXT NOT NULL,
    creationIp TEXT NOT NULL
);

CREATE TABLE NumReads (
    id TEXT PRIMARY KEY NOT NULL,
    numReads INT DEFAULT 1,
    access TEXT NOT NULL
);
