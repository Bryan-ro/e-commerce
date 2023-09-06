declare namespace JwtPayload {
    class payload extends JwtPayload {
        readonly username: string;
        readonly email: string;
        readonly role: string;
    }
}
