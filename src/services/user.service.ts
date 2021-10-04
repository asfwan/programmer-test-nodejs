import { BaseItem, User } from "../types/user.interface";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { makeid, saltPassword, compareCredential } from "../utils/hash";

export const create = (user: BaseItem, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from movie_user WHERE name='${user.name}');`;
  const queryString = "INSERT INTO movie_user SET name=?, email=?, password=?;";

  // Check same name movie
  db.query(existCheckString, async (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist =
      rows[0][`EXISTS(SELECT 1 from movie_user WHERE name='${user.name}')`];
    if (exist >= 1) {
      return callback(new Error("Invalid user, duplicate user name"));
    } else {
      const hashPassword = await saltPassword(user.password);
      db.query(
        queryString,
        [user.name, user.email, hashPassword],
        (err, result) => {
          if (err) callback(err);
          const insertId = (<OkPacket>result).insertId;
          callback(null, insertId);
        }
      );
    }
  });
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM movie_user`;

  db.query(queryString, (err, result) => {
    if (err) callback(err);

    const rows = <RowDataPacket[]>result;
    const users: User[] = [];

    rows.forEach((row) => {
      const user: User = {
        user_id: row.user_id,
        name: row.name,
        email: row.email,
      };
      users.push(user);
    });
    callback(null, users);
  });
};

export const find = (param: User, callback: Function) => {
  const queryString = `SELECT * FROM movie_user WHERE name='${param.name}' OR email='${param.email}'`;

  db.query(queryString, (err, result) => {
    if (err) callback(err);

    const rows = <RowDataPacket[]>result;
    const users: User[] = [];

    rows.forEach((row) => {
      const user: User = {
        user_id: row.user_id,
        name: row.name,
        email: row.email,
      };
      users.push(user);
    });
    callback(null, users);
  });
};

export const update = (param: User, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from movie_user WHERE user_id=${param.user_id});`;
  const queryString = `UPDATE movie_user SET name=?, email=?, password=? WHERE user_id=?`;

  // Check Id validity
  db.query(existCheckString, async (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist =
      rows[0][
        `EXISTS(SELECT 1 from movie_user WHERE user_id=${param.user_id})`
      ];
    if (exist <= 0) {
      return callback(new Error("Invalid User ID"));
    } else {
      const hashPassword = await saltPassword(param.password);
      db.query(
        queryString,
        [param.name, param.email, hashPassword, param.user_id],
        (err, result) => {
          if (err) callback(err);
          callback(null, result);
        }
      );
    }
  });
};

export const deleteUser = (param: User, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from movie_user WHERE user_id=${param.user_id});`;
  const queryString = `DELETE FROM movie_user WHERE user_id=${param.user_id}`;

  // Check Id validity
  db.query(existCheckString, (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist =
      rows[0][
        `EXISTS(SELECT 1 from movie_user WHERE user_id=${param.user_id})`
      ];
    if (exist <= 0) {
      callback(new Error("Invalid user ID"));
    } else {
      db.query(queryString, (err, result) => {
        if (err) callback(err);
        callback(null, result);
      });
    }
  });
};

export const login = (param: User, callback: Function) => {
  const existCheckString = `SELECT * from movie_user WHERE name='${param.name}' AND email='${param.email}';`;

  // Check Id validity
  db.query(existCheckString, async (err, result) => {
    if (err) return callback(err);
    const rows = <RowDataPacket[]>result;
    const { password, ...user } = rows[0];
    if (rows.length > 0) {
      const valid = await compareCredential(param.password, password);
      if (valid) {
        const returnObj = {
          message: "Successfully login user",
          user: user,
          token: await makeid(128),
        };
        return callback(null, returnObj);
      }
      return callback(new Error("Invalid login credentials"));
    }
    return callback(new Error("Invalid login credentials"));
  });
};
