import { BaseItem, Cast } from "../types/cast.interface";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (cast: BaseItem, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from cast WHERE name='${cast.name}');`;
  const queryString = "INSERT INTO cast SET name=?, rolename=?, movie_id=?;";

  // Check same name movie
  db.query(existCheckString, (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist =
      rows[0][`EXISTS(SELECT 1 from cast WHERE name='${cast.name}')`];
    if (exist >= 1) {
      return callback(new Error("Invalid cast, duplicate cast name"));
    } else {
      db.query(
        queryString,
        [cast.name, cast.rolename, cast.movie_id],
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
  const queryString = `SELECT * FROM cast`;

  db.query(queryString, (err, result) => {
    if (err) callback(err);

    const rows = <RowDataPacket[]>result;
    const cast: Cast[] = [];

    rows.forEach((row) => {
      const actor: Cast = {
        id: row.id,
        name: row.name,
        rolename: row.rolename,
        movie_id: row.movie_id,
      };
      cast.push(actor);
    });
    callback(null, cast);
  });
};

export const find = (param: Cast, callback: Function) => {
  const queryString = `SELECT * FROM cast WHERE name='${param.name}' OR rolename='${param.rolename}'`;

  db.query(queryString, (err, result) => {
    if (err) callback(err);

    const rows = <RowDataPacket[]>result;
    const cast: Cast[] = [];

    rows.forEach((row) => {
      const actor: Cast = {
        id: row.id,
        name: row.name,
        rolename: row.rolename,
        movie_id: row.movie_id,
      };
      cast.push(actor);
    });
    callback(null, cast);
  });
};

export const update = (param: Cast, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from cast WHERE id=${param.id});`;
  const queryString = `UPDATE cast SET name=?, rolename=?, movie_id=? WHERE id=?`;

  // Check Id validity
  db.query(existCheckString, (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist = rows[0][`EXISTS(SELECT 1 from cast WHERE id=${param.id})`];
    if (exist <= 0) {
      return callback(new Error("Invalid cast ID"));
    } else {
      db.query(
        queryString,
        [param.name, param.rolename, param.movie_id, param.id],
        (err, result) => {
          if (err) callback(err);
          callback(null, result);
        }
      );
    }
  });
};

export const deleteCast = (param: Cast, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from cast WHERE id=${param.id});`;
  const queryString = `DELETE FROM cast WHERE id=${param.id}`;

  // Check Id validity
  db.query(existCheckString, (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist = rows[0][`EXISTS(SELECT 1 from cast WHERE id=${param.id})`];
    if (exist <= 0) {
      callback(new Error("Invalid cast ID"));
    } else {
      db.query(queryString, (err, result) => {
        if (err) callback(err);
        callback(null, result);
      });
    }
  });
};
