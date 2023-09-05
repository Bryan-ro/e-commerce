import { sign } from "jsonwebtoken";
import env from "dotenv";
env.config();

export class JWTConfig {
    public sign (payload: JwtPayload.payload) {
        return sign(payload, String(process.env.JWT_TOKEN), { expiresIn: "24h" });
    }
}
