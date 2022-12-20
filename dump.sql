CREATE DATABASE "shortly";

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "createdAt" DATE DEFAULT NOW()
);

CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "shortUrl" TEXT NOT NULL,
    "visitCount" INTEGER DEFAULT 0,
    "createdAt" DATE DEFAULT NOW()
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    token TEXT NOT NULL
);

/* CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "urlId" INTEGER NOT NULL REFERENCES "urls"("id"),
    "createdAt" DATE DEFAULT NOW()
); */