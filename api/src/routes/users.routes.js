import { Router } from "express";
import * as usersCtrl from '../controllers/users.controller.js'
import { verifyToken } from "../middleware/authjwt.js";

const router = new Router()

router.post('/login', usersCtrl.login)

router.post('/register', usersCtrl.register)

export default router