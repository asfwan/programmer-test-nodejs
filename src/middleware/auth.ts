import { Request, Response, NextFunction } from "express";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const tokenHeader = authHeader?.split(" ")[0] || "";

    if (tokenHeader === "Bearer") {
      return next();
    }
    return res.status(401).send({
      message: "Unauthorized access. Missing Bearer token.",
      statusCode: 401,
    });
  } catch (err) {
    return res.status(403).send({
      message: "Forbidden access. Invalid Bearer token.",
      statusCode: 403,
    });
  }
};

module.exports = { validateToken };
