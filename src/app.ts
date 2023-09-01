import express from "express";

const app = express();
app.use(express.json());

const port = process.env.PORT || 4444;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
