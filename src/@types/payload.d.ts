declare namespace JwtPayload {
    class payload extends JwtPayload {
        readonly id: number;
        readonly username: string;
        readonly email: string;
        readonly role: string;
    }
}
