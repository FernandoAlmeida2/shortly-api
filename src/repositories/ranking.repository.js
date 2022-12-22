import { connection } from "../database/database.js";

export function selectRanking(){
    return connection.query(`
    SELECT
        users.id,
        users.name,
        COUNT(DISTINCT urls.id) AS "linksCount",
        COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
    FROM users LEFT JOIN urls ON users.id = urls."userId"
    GROUP BY users.id
    ORDER BY "visitCount" DESC LIMIT 10`);
}