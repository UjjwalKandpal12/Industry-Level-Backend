import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controllers/user.controller.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
const userRouter = Router();
//routes declarations
userRouter.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

userRouter.post("/login", loginUser);
//secured routes
userRouter.post("/logout", verifyUser, logoutUser);
userRouter.post("/refresh-access-token", refreshAccessToken);
export default userRouter;
