declare namespace PrismaTypes {
    interface image {
        productId: number;
        url: string;
    }

    interface product {
        id: number;
        title: string;
        description: string;
        price: number;
        tags: string[];
        userId?: string;
        images: string[];
    }
}

