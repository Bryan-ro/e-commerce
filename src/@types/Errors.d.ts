declare namespace Errors {
    interface prisma {
        code: string;
        meta: {
            target: string;
        }
    }

    interface stripe {
        raw: {
            code: string;
        }
    }
}
