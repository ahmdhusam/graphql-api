import humps from "humps";
import { writePool, readPool } from "../../db/mysql";

export async function getAllUsersService({ search, limit, offset }) {
  let getQuery = "SELECT * FROM users u";
  const values = [];

  if (search) {
    getQuery += ' WHERE u.name LIKE "%?%" ';
    values.push(search);
  }

  if (limit && (offset || offset === 0)) {
    getQuery += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit, 10), parseInt(offset, 10));
  }

  const result = await readPool.query(getQuery, values);
  return humps.camelizeKeys(result[0]);
}

export async function getUserDetailsService({ userId }) {
  const query = "SELECT * FROM users WHERE id = ?";
  const result = await readPool.query(query, [userId]);
  if (result.length) {
    return humps.camelizeKeys(result[0][0]);
  }
  return {};
}

export async function createUserService({ name, email, city, imageUrl }) {
  const result = await writePool.query(
    "INSERT INTO users (name, email, city, image_url) VALUES (?, ?, ?, ?)",
    [name, email, city, imageUrl]
  );
  if (!result[0].affectedRows) {
    return {};
  }
  return {
    id: result[0].insertId,
    name,
    email,
    city,
    imageUrl,
  };
}

export async function updateUserService({
  userId,
  name,
  email,
  city,
  imageUrl,
}) {
  let updateQuery = "UPDATE users SET";
  const updates = [];
  const updateValues = [];

  if (name) {
    updates.push(" name = ? ");
    updateValues.push(name);
  }

  if (email) {
    updates.push(" email = ? ");
    updateValues.push(email);
  }

  if (city) {
    updates.push(" city = ? ");
    updateValues.push(city);
  }

  if (imageUrl) {
    updates.push(" image_url = ? ");
    updateValues.push(imageUrl);
  }

  updateQuery = `${updateQuery} ${updates.join()}  WHERE id = ?`;
  await writePool.query(updateQuery, [...updateValues, userId]);
  const updatedUser = await getUserDetailsService({ userId });
  return updatedUser;
}

export async function deleteUserService({ userId }) {
  await writePool.query("UPDATE users SET is_active = 0 WHERE id = ?", [
    userId,
  ]);
}

export async function reviewsOfUsersService({ userId, limit, offset }) {
  let query = "SELECT * FROM product_reviews WHERE user_id = ? ";
  const values = [userId];

  if (limit && (offset || offset === 0)) {
    query += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit, 10), parseInt(offset, 10));
  }
  const result = await readPool.query(query, values);
  return humps.camelizeKeys(result[0]);
}
