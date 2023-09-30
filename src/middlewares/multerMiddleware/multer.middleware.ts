import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

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
        fileSize: 1 * 1024,     
    }
});
