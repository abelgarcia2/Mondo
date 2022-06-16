import { parsePlaceObject } from "../utils/utils.js";
import Place from "../models/PlaceSchema.js";
import { addPlaceToUser, getDistance } from "../utils/utils.js";
import { JoiPlaceSchema } from "../validation/JoiPlaceSchema.js";

const addPlace = async (req, res) => {
    // const reqPlace = parsePlaceObject(req)
    const reqPlace = req.body
    console.log(reqPlace);
    reqPlace.labels = reqPlace.labels.split(',')

    console.log(reqPlace);

    
    const validation = JoiPlaceSchema.validate(reqPlace, { convert: false })
    const { error } = validation
    
    if (error) {
        const msg = error.details[0].message
        
        res.status(400).json({ message: 'Invalid fields', error: msg })
    } else {
        const newPlace = new Place(reqPlace)
        console.log(newPlace);
        try {
            await newPlace.save()

            addPlaceToUser(req.headers.jwt, newPlace)

            res.status(201).json({ message: "The place was created succesfully", place_id: newPlace._id })
        } catch (err) {
            res.status(400).json({ message: 'Place already exists' })
        }
    }
}

const getPlaceById = async (req, res) => {
    const { id } = req.params;

    try {
        const place = await Place.findById(id)

        if (place != null)
            res.status(200).json(place)
        else
            res.status(404).json({ message: "The requested place does not exist" })

    } catch (err) {
        res.status(400).json({ message: id + ' is not a valid id' })
    }
}

const getAllPlaces = async (req, res) => {
    const places = await Place.find()

    places.length > 0
        ? res.status(200).json(places)
        : res.status(404).json({ message: "There aren't any places" })
}

const getPlacesInDistance = async (req, res) => {
    const allPlaces = await Place.find();
    const reqDistance = parseInt(req.query.distance)
    const reqLocation = { lat: parseFloat(req.query.lat), lng: parseFloat(req.query.lng) }

    const matchPlaces = allPlaces.filter((place) => {
        const { location } = place
        if (Math.trunc(getDistance(location, reqLocation)) <= reqDistance) {
            return place;
        }
    })

    matchPlaces.length > 0
        ? res.status(200).json(matchPlaces)
        : res.status(404).json({ message: "There aren't places that meet the specified criteria" })
}

const getRandomPlace = async (req, res) => {
    const allPlaces = await Place.find()
    const min = 0; const max = allPlaces.length - 1

    const index = Math.trunc(Math.random() * (max - min + 1) + min)

    const resPlace = allPlaces[index];

    resPlace != undefined
        ? res.status(200).json(resPlace)
        : res.status(404).json({ message: "There aren't any places" })
}

const getPlacesByLabels = async (req, res) => {
    req = req.params.list
    const reqLabels = req.split(",")

    const resPlaces = await Place.find({ labels: { $in: reqLabels } })

    resPlaces.length > 0
        ? res.status(200).json(resPlaces)
        : res.status(404).json({ message: "There aren't places that meet the specified criteria" })
}

const getPlaceByLabels = async (req, res) => {
    req = req.params.list
    const reqLabels = req.split(",")

    const resPlace = await Place.find({ labels: { $all: reqLabels } });

    resPlace.length > 0
        ? res.status(200).json(resPlace)
        : res.status(404).json({ message: "There aren't places that meet the specified criteria" })
}

export { addPlace, getPlaceById, getAllPlaces, getPlacesInDistance, getRandomPlace, getPlacesByLabels, getPlaceByLabels }