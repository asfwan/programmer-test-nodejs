import express, { Request, Response } from "express";
import { Movie } from "../types/movie.interface";

const route = express.Router();
const movieService = require("../services/movies.service");

route.post("/findAll", async (req: Request, res: Response) => {
  movieService.findAll((err: Error, movies: Movie[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({ data: movies });
  });
});

route.post("/find", async (req: Request, res: Response) => {
  movieService.find(req.body, (err: Error, movies: Movie[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({ data: movies });
  });
});

route.post("/update", async (req: Request, res: Response) => {
  movieService.update(req.body, (err: Error) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({
      message: `Successfully update movie detail with id ${req.body.movie_id}`,
    });
  });
});

route.post("/create", async (req: Request, res: Response) => {
  movieService.create(req.body, (err: Error, movies: Movie[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res
      .status(200)
      .json({ message: `Successfully create movie with id ${movies}` });
  });
});

route.post("/delete", async (req: Request, res: Response) => {
  movieService.deleteMovie(req.body, (err: Error, movies: Movie[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res
      .status(200)
      .json({
        message: `Successfully delete movie with id ${req.body.movie_id}`,
      });
  });
});

module.exports = route;
