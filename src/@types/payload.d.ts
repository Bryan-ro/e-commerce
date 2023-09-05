declare namespace JwtPayload {
    interface payload extends JwtPayload {
        readonly username: string;
        readonly email: string;
        readonly role: string
    }
}
