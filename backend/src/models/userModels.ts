import { query } from "../config/db";

export const getUserByEmail = async (email: string) => {
  const sql = `Select * from core.users where email = $1`;
  const result = await query(sql, [email]);
  return result.rows[0];
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
  roles = ["player"]
) => {
  const sql = `insert into core.users(username,email,password,roles) 
                values ($1,$2,$3,$4)
                Returning *`;
  const result = await query(sql, [username, email, password, roles]);
  return result.rows[0];
};

export const getUserById = async (id: number) => {
  const sql = `select * from core.users where id = $1`;
  const result = await query(sql, [id]);
  return result.rows[0];
};

export const updateRefreshToken = async (
  refreshToken: string,
  userID: number,
  expiresAt: Date
) => {
  const sql = `insert into core.tokens (refresh_token, user_id,expires_at ) values ($1,$2,$3) `;
  await query(sql, [refreshToken, userID, expiresAt]);
  return;
};

export const updateUser = async (
  username: string,
  email: string,
  id: number
) => {
  const sql = `update core.users set username=$1, email=$2 where id=$3 `;
  await query(sql, [username, email, id]);
};

export const deactivateUser = async (id: number, currentTime: string) => {
  const sql = `update core.users set deleted_at = $1 where id = $2 `;
  await query(sql, [currentTime, id]);
};
export const reactivateUser = async (id: number) => {
  const sql = `update core.users set deleted_at = null where id = $1 `;
  await query(sql, [id]);
};

export const deleteUser = async (id: number) => {
  const sql = `delete from core.users where id =$1`;
  await query(sql, [id]);
};
