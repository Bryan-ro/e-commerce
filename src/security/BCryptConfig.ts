import bcrypt from "bcrypt";
import env from "dotenv";
env.config();

export class BCryptConfig {
    public async hashPass (plainPassword: string) {
        return await bcrypt.hash(plainPassword, 15);
    }

    public async comparePass (hash: string, plainPassword: string) {
        return await bcrypt.compare(plainPassword, hash);
    }
}
