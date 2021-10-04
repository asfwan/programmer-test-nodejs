import { BaseItem, Movie } from "../types/movie.interface";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (movie: BaseItem, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from movie WHERE title='${movie.title}');`;
  const queryString =
    "INSERT INTO movie (title, director, description, duration_min) VALUES (?, ?, ?, ?)";

  // Check same name movie
  db.query(existCheckString, (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist =
      rows[0][`EXISTS(SELECT 1 from movie WHERE title='${movie.title}')`];
    if (exist >= 1) {
      return callback(new Error("Invalid movie, duplicate movie title"));
    } else {
      db.query(
        queryString,
        [movie.title, movie.director, movie.description, movie.duration_min],
        (err, result) => {
          if (err) {
            callback(err);
          }

          const insertId = (<OkPacket>result).insertId;
          callback(null, insertId);
        }
      );
    }
  });
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM movie`;

  db.query(queryString, (err, result) => {
    if (err) callback(err);

    const rows = <RowDataPacket[]>result;
    const movies: Movie[] = [];

    rows.forEach((row) => {
      const movie: Movie = {
        movie_id: row.movie_id,
        title: row.title,
        director: row.director,
        description: row.description,
        duration_min: row.duration_min,
      };
      movies.push(movie);
    });
    callback(null, movies);
  });
};

export const find = (param: Movie, callback: Function) => {
  const queryString = `SELECT * FROM movie WHERE title='${param.title}' OR description='${param.description}'`;

  db.query(queryString, (err, result) => {
    if (err) callback(err);

    const rows = <RowDataPacket[]>result;
    const movies: Movie[] = [];

    rows.forEach((row) => {
      const movie: Movie = {
        movie_id: row.movie_id,
        title: row.title,
        director: row.director,
        description: row.description,
        duration_min: row.duration_min,
      };
      movies.push(movie);
    });
    callback(null, movies);
  });
};

export const update = (param: Movie, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from movie WHERE movie_id=${param.movie_id});`;
  const queryString = `UPDATE movie SET title=?, director=?, description=?, duration_min=? WHERE movie_id=?`;

  // Check Id validity
  db.query(existCheckString, (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist =
      rows[0][`EXISTS(SELECT 1 from movie WHERE movie_id=${param.movie_id})`];
    if (exist <= 0) {
      return callback(new Error("Invalid movie ID"));
    } else {
      db.query(
        queryString,
        [
          param.title,
          param.director,
          param.description,
          param.duration_min,
          param.movie_id,
        ],
        (err, result) => {
          if (err) callback(err);
          callback(null, result);
        }
      );
    }
  });
};

export const deleteMovie = (param: Movie, callback: Function) => {
  const existCheckString = `SELECT EXISTS(SELECT 1 from movie WHERE movie_id=${param.movie_id});`;
  const queryString = `DELETE FROM movie WHERE movie_id=${param.movie_id}`;

  // Check Id validity
  db.query(existCheckString, (err, result) => {
    if (err) callback(err);
    const rows = <RowDataPacket[]>result;
    const exist =
      rows[0][`EXISTS(SELECT 1 from movie WHERE movie_id=${param.movie_id})`];
    if (exist <= 0) {
      callback(new Error("Invalid movie ID"));
    } else {
      db.query(queryString, (err, result) => {
        if (err) callback(err);
        callback(null, result);
      });
    }
  });
};
