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
SELECT
    users.id,
    users.name,
    COUNT(urls.id)
FROM
    users
    JOIN urls ON users.id = urls."userId"
WHERE
    urls."userId" = $ 1
GROUP BY
    users.id;

SELECT id, "shortUrl", url, "visitCount"
FROM urls
WHERE
    "userId" = $ 1;

SELECT
    users.id,
    users.name,
    COUNT(DISTINCT urls.id) AS "linksCount",
    SUM(urls."visitCount") AS "visitCount"
FROM users JOIN urls ON users.id = urls."userId"
GROUP BY users.id
ORDER BY "visitCount" DESC LIMIT 10;