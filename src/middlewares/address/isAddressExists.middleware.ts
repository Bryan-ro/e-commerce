import { Request, Response, NextFunction } from "express";
import maps from "@google/maps";
import env from "dotenv";
import { AppError } from "../../errors/AppError";
import { CreateAddressDto } from "../../dto/address/CreateAdressDto";

env.config();

const client = maps.createClient({
    key: `${process.env.GOOGLE_MAPS_KEY}`
});

export const isAddressExists = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateAddressDto = req.body;
    
    client.geocode({
        address: data.cep
    }, (err, response) => {
        if(err || response.json.results.length == 0) {
            return next(new AppError("Invalid address"));
        }

        return next();
    });

};













// export default (() => {
//     client.geocode({
//         address: ""
//     }, function(err, response) {
//         if (!err) {
//             console.log(response.json.results);
//         }
//     });
    
// })();
