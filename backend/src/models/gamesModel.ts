import { query } from "../config/db";

export const getGame = async (id: string) => {
  const sql = `select * from tic_tac_toe.games where room_id = $1 `;
  const result = await query(sql, [id]);
  return result.rowCount;
};

export const getLeaderboardData = async () => {
  const sql = `select 
  u.id AS player_id,
  u.username,
  count(g.id) filter (where g.player_x_id = u.id OR g.player_o_id = u.id) AS matches_played,
  count(g.id) filter (where g.winner_id = u.id) AS wins,
  count(g.id) filter (
    where 
      (g.player_x_id = u.id OR g.player_o_id = u.id) 
      AND g.winner_id IS NOT NULL 
      AND g.winner_id != u.id
  ) AS losses,
  count(g.id) filter (
    where 
      (g.player_x_id = u.id OR g.player_o_id = u.id) 
      AND g.winner_id IS NULL
  ) AS draws,
  (COUNT(g.id) filter (where g.winner_id = u.id)) * 3 +
  (COUNT(g.id) filter (
     where 
       (g.player_x_id = u.id OR g.player_o_id = u.id) 
       AND g.winner_id IS NULL
   )) * 1 AS points
from core.users u
join tic_tac_toe.games g ON u.id = g.player_x_id OR u.id = g.player_o_id
GROUP BY u.id, u.username
ORDER BY points DESC, wins DESC;
`;

  const result = await query(sql);
  return result;
};
