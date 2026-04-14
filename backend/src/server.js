import { } from "express";

import dotenv from "dotenv";

dotenv.config();

import connectDB from "./db/db.js";

import app from "./app.js";

connectDB().then(() => {
    const PORT = process.env.PORT ?? 8000;
    app.listen(PORT, () => {
        console.log(`App is listening on PORT :${PORT}`);
    });
});



