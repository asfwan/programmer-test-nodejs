import express, { Request, Response } from "express";
import { Cast } from "../types/cast.interface";

const route = express.Router();
const castService = require("../services/cast.service");

route.post("/findAll", async (req: Request, res: Response) => {
  castService.findAll((err: Error, cast: Cast[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({ data: cast });
  });
});

route.post("/find", async (req: Request, res: Response) => {
  castService.find(req.body, (err: Error, cast: Cast[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({ data: cast });
  });
});

route.post("/update", async (req: Request, res: Response) => {
  castService.update(req.body, (err: Error) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({
      message: `Successfully update cast detail with id ${req.body.id}`,
    });
  });
});

route.post("/create", async (req: Request, res: Response) => {
  castService.create(req.body, (err: Error, cast: Cast[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res
      .status(200)
      .json({ message: `Successfully create cast with id ${cast}` });
  });
});

route.post("/delete", async (req: Request, res: Response) => {
  castService.deleteCast(req.body, (err: Error, cast: Cast[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({
      message: `Successfully delete cast with id ${req.body.id}`,
    });
  });
});

module.exports = route;
