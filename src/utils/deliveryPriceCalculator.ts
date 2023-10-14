import maps from "@google/maps";
import "dotenv/config";

const client = maps.createClient({
    key: `${process.env.GOOGLE_MAPS_KEY}`
});

export function deliveryPriceCalculator(senderZipCode: string, destinationZipCode: string, productQuantity: number) {
    client.distanceMatrix({
        
    });
}
