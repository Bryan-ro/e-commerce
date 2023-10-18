import maps from "@google/maps";
import "dotenv/config";
import { AppError } from "../errors/AppError";

const client = maps.createClient({
    key: `${process.env.GOOGLE_MAPS_KEY}`
});

export function deliveryPriceCalculator(senderZipCode: unknown, destinationZipCode: unknown, productQuantity: number) {
    return new Promise((resolve) => {
        client.distanceMatrix({
            origins: senderZipCode as maps.LatLng[],
            destinations: destinationZipCode as maps.LatLng[],
        }, (err, result) => {
            if(err) {
                throw new AppError("Error to calculate the delivery price", 500);
            }
            
            resolve(+result.json.rows[0].elements[0].distance.text.replace("km", "") * productQuantity);
        });
    });
}
