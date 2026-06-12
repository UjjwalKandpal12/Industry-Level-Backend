import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controllers/user.controller.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
import { getCurrentUser } from "../controllers/user.controller.js";
import { updateAvatar } from "../controllers/user.controller.js";
import { updateCoverImage } from "../controllers/user.controller.js";
import { getUserChannelProfile } from "../controllers/user.controller.js";
import { getWatchHistory } from "../controllers/user.controller.js";
import { changeCurrentPassword } from "../controllers/user.controller.js";
import { updateAccountDetails } from "../controllers/user.controller.js";
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
userRouter.post("/change-password", verifyUser, changeCurrentPassword);
userRouter.get("/current-user", verifyUser, getCurrentUser);
userRouter.patch("/update-account-details", verifyUser, updateAccountDetails);
userRouter.patch("/avatar", verifyUser, upload.single("avatar"), updateAvatar);
userRouter.patch(
  "/cover-image",
  verifyUser,
  upload.single("coverImage"),
  updateCoverImage
);
userRouter.get("/channel-profile/:username", verifyUser, getUserChannelProfile);
userRouter.get("/watchHistory", verifyUser, getWatchHistory);
export default userRouter;
