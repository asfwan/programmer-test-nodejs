import express, { Request, Response } from "express";
import { Wishlist } from "../types/wishlist.interface";

const route = express.Router();
const wishlistService = require("../services/wishlist.service");

route.post("/findAll", async (req: Request, res: Response) => {
  wishlistService.findAll((err: Error, wishlist: Wishlist[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({ data: wishlist });
  });
});

route.post("/find", async (req: Request, res: Response) => {
  wishlistService.find(req.body, (err: Error, wishlist: Wishlist[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({ data: wishlist });
  });
});

route.post("/update", async (req: Request, res: Response) => {
  wishlistService.update(req.body, (err: Error) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res.status(200).json({
      message: `Successfully update wishlist detail with id ${req.body.wishlist_id}`,
    });
  });
});

route.post("/create", async (req: Request, res: Response) => {
  wishlistService.create(req.body, (err: Error, wishlist: Wishlist[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    return res
      .status(200)
      .json({ message: `Successfully create user with id ${wishlist}` });
  });
});

route.post("/delete", async (req: Request, res: Response) => {
  wishlistService.deleteWishlist(
    req.body,
    (err: Error, wishlist: Wishlist[]) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      }

      return res.status(200).json({
        message: `Successfully delete wishlist with id ${req.body.wishlist_id}`,
      });
    }
  );
});

module.exports = route;
