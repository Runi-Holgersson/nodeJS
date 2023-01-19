export const GET_USERS = "SELECT * FROM public.users ORDER BY id ASC";
export const GET_USER = "SELECT * FROM users WHERE id = $1";
export const SEARCH_USER = "SELECT * FROM users WHERE position($1 in login)>0 LIMIT $2";
export const DELETE_USER = "DELETE FROM users WHERE id = $1";
export const UPDATE_USER = "UPDATE users SET login = $1, password = $2, age = $3, isDeleted = $4 WHERE id = $5";
export const CREATE_USER = "INSERT INTO users ( id, login, password, age, isDeleted ) VALUES ($1, $2, $3, $4, $5) RETURNING *";