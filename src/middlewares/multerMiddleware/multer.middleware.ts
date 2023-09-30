import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { AppError } from "../../errors/AppError";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        const dir = path.join(__dirname, "../../../public/images");
        
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        callback(null, dir);
    },
    filename(req, file, callback) {
        const ext = path.extname(file.originalname);

        callback(null, `${uuid()}_${req.params.id}${ext}`);
    }
});



export const upload = multer({
    storage,
    limits: {
        fileSize: 0.8 * 1024 * 1024,     
    },
    fileFilter(req, file, callback) {
        if(file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
            return callback(new AppError(`Invalid file type: ${file.mimetype} the file type must be image/png or image/jpeg`));
        }

        return callback(null, true);
    },
});
