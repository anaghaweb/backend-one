import cors from "cors";

const corsOptions = {
    origin: '*', // Allow all origins for testing
    credentials: true, // Include credentials if necessary (e.g., cookies, authorization headers)
};

export const applyCors = cors(corsOptions);
