import cors from "cors";

const corsOptions = {
    origin: ['http://192.168.0.103:3000', 'https://admin-one-inky.vercel.app', 'https://stock-fe-01.vercel.app'],
    credentials: true, // Include credentials if necessary (e.g., cookies, authorization headers)
};

export const applyCors = cors(corsOptions);
