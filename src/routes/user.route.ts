import express, { Request, Response } from "express";
import { User } from "../types/user.interface";

const route = express.Router();
const userService = require("../services/user.service");

route.post("/findAll", async (req: Request, res: Response) => {
  userService.findAll((err: Error, users: User[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({ data: users });
  });
});

route.post("/find", async (req: Request, res: Response) => {
  userService.find(req.body, (err: Error, users: User[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({ data: users });
  });
});

route.post("/update", async (req: Request, res: Response) => {
  userService.update(req.body, (err: Error) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({
      message: `Successfully update user detail with id ${req.body.user_id}`,
    });
  });
});

route.post("/create", async (req: Request, res: Response) => {
  userService.create(req.body, (err: Error, user: User[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res
      .status(200)
      .json({ message: `Successfully create user with id ${user}` });
  });
});

route.post("/delete", async (req: Request, res: Response) => {
  userService.deleteUser(req.body, (err: Error, user: User[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({
      message: `Successfully delete cast with id ${req.body.user_id}`,
    });
  });
});

route.post("/login", async (req: Request, res: Response) => {
  userService.login(req.body, (err: Error, user: User[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({ data: user });
  });
});

module.exports = route;
