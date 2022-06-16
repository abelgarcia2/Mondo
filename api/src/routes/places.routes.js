import multer from "../config/multer.js"
import { Router } from "express";
import * as placesCtrl from '../controllers/places.controller.js'
import { verifyToken } from "../middleware/authjwt.js";

const router = new Router()

router.get('/', placesCtrl.getAllPlaces)

router.post('/new', verifyToken, multer.array('images', 10), placesCtrl.addPlace)

router.get('/byDistance', placesCtrl.getPlacesInDistance)

router.get('/byLabels/:list', placesCtrl.getPlacesByLabels)

router.get('/byLabel/:list', placesCtrl.getPlaceByLabels)

router.get('/random', placesCtrl.getRandomPlace)

router.get('/:id', placesCtrl.getPlaceById)

export default router