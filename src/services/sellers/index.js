import humps from "humps";
import { writePool, readPool } from "../../db/mysql";

export async function getAllSellersService({ search, limit, offset }) {
  let getQuery = "SELECT * FROM sellers s";
  const values = [];

  if (search) {
    getQuery += ' WHERE s.name LIKE "%%" ';
    values.push(search);
  }

  if (limit && (offset || offset === 0)) {
    getQuery += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit, 10), parseInt(offset, 10));
  }

  const result = await readPool.query(getQuery, values);
  return humps.camelizeKeys(result[0]);
}

export async function getSellerDetailsService({ sellerId }) {
  const query = "SELECT * FROM sellers WHERE id = ?";
  const result = await readPool.query(query, [sellerId]);
  if (result.length) {
    return result[0][0];
  }
  return {};
}

export async function createSellerService({ name, email, city, imageUrl }) {
  const result = await writePool.query(
    "INSERT INTO sellers (name, email, city, image_url) VALUES (?, ?, ?, ?)",
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

export async function updateSellerService({
  sellerId,
  name,
  email,
  city,
  imageUrl,
}) {
  let updateQuery = "UPDATE sellers SET";
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
  await writePool.query(updateQuery, [...updateValues, sellerId]);
  const updatedUser = await getSellerDetailsService({ sellerId });
  return updatedUser;
}

export async function deleteSellerService({ sellerId }) {
  await writePool.query("UPDATE sellers SET is_active = 0 WHERE id = ?", [
    sellerId,
  ]);
}

export async function getProductsOfSellerService({ sellerId, limit, offset }) {
  let query =
    "SELECT p.* FROM products p INNER JOIN products_seller_maping psm ON p.id = psm.product_id WHERE psm.seller_id = ?";

  const values = [sellerId];

  if (limit && (offset || offset === 0)) {
    query += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit, 10), parseInt(offset, 10));
  }
  const result = await readPool.query(query, values);
  return humps.camelizeKeys(result[0]);
}
