import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import User from "../models/UserSchema.js"

export function getDistance(place1, place2) {
    let lat1 = place1.lat;
    let lng1 = place1.lng;
    let lat2 = place2.lat;
    let lng2 = place2.lng;

    const degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180
    };

    const earthRadius = 6371;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLong = degreesToRadians(lng2 - lng1);

    lat1 = degreesToRadians(lat1)
    lat2 = degreesToRadians(lat2)

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLong / 2) * Math.sin(dLong / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
}

export async function checkPasswordMatch(reqPassword, foundPassword) {
    return await bcrypt.compare(reqPassword, foundPassword)
}

export async function addPlaceToUser(cookie, place) {
    const decodedToken = jwt.verify(cookie, process.env.SECRET)

    User.findByIdAndUpdate({ _id: decodedToken.id }, { $push: { created_places: place._id } },
        { new: true }, (err, doc) => { console.log(err); console.log(doc); });
}

export function parsePlaceObject(req) {
    const truncateDecimals = (numStr, decimals) => {
        let num = parseFloat(numStr)
        num = num.toFixed(decimals)
        return parseFloat(num)
    }
    
    
    const reqPlace = req.body
    reqPlace.labels = reqPlace.labels.split(',')
    reqPlace.location = {
        lat: truncateDecimals(reqPlace.location.lat, 6),
        lng: truncateDecimals(reqPlace.location.lng, 6)
    }

    delete reqPlace.lat
    delete reqPlace.lng

    let files = req.files
    // files = files.map((file) => {
    //     return `http://${req.hostname}/${file.path}`
    // })
    reqPlace.images = files

    return reqPlace
}