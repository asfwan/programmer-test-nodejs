import { BaseItem, Wishlist } from "../types/wishlist.interface";

import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { makeid, saltPassword, compareCredential } from "../utils/hash";

export const create = (wishlist: BaseItem, callback: Function) => {
  const queryString = "INSERT INTO wishlist SET movie_id=?, user_id=?;";
  db.query(
    queryString,
    [wishlist.movie_id, wishlist.user_id],
    (err, result) => {
      if (err) callback(err);
      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM wishlist`;

  db.query(queryString, (err, result) => {
    if (err) callback(err);

    const rows = <RowDataPacket[]>result;
    const wishlist: Wishlist[] = [];

    rows.forEach((row) => {
      const item: Wishlist = {
        wishlist_id: row.wishlist_id,
        movie_id: row.movie_id,
        user_id: row.user_id,
      };
      wishlist.push(item);
    });
    callback(null, wishlist);
  });
};

export const find = (param: Wishlist, callback: Function) => {
  const queryString = `SELECT * FROM wishlist WHERE movie_id='${param.movie_id}' OR user_id='${param.user_id}'`;

  db.query(queryString, (err, result) => {
    if (err) callback(err);

    const rows = <RowDataPacket[]>result;
    const wishlist: Wishlist[] = [];

    rows.forEach((row) => {
      const item: Wishlist = {
        wishlist_id: row.wishlist_id,
        movie_id: row.movie_id,
        user_id: row.user_id,
      };
      wishlist.push(item);
    });
    callback(null, wishlist);
  });
};

export const update = (param: Wishlist, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from wishlist WHERE wishlist_id=${param.wishlist_id});`;
  const queryString = `UPDATE wishlist SET movie_id=?, user_id=? WHERE wishlist_id=?`;

  // Check Id validity
  db.query(existCheckString, async (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist =
      rows[0][
        `EXISTS(SELECT 1 from wishlist WHERE wishlist_id=${param.wishlist_id})`
      ];
    if (exist <= 0) {
      return callback(new Error("Invalid User ID"));
    } else {
      db.query(
        queryString,
        [param.movie_id, param.user_id, param.wishlist_id],
        (err, result) => {
          if (err) callback(err);
          callback(null, result);
        }
      );
    }
  });
};

export const deleteWishlist = (param: Wishlist, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from wishlist WHERE wishlist_id=${param.wishlist_id});`;
  const queryString = `DELETE FROM wishlist WHERE wishlist_id=${param.wishlist_id}`;

  // Check Id validity
  db.query(existCheckString, (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist =
      rows[0][
        `EXISTS(SELECT 1 from wishlist WHERE wishlist_id=${param.wishlist_id})`
      ];
    if (exist <= 0) {
      callback(new Error("Invalid wishlist ID"));
    } else {
      db.query(queryString, (err, result) => {
        if (err) callback(err);
        callback(null, result);
      });
    }
  });
};
