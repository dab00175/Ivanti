import express, { json } from "express";
import cors from "cors";
import { findCloseToZero } from "../service/TempService.js";

const app = express();
app.use(cors());
app.use(express.json());

// POST mapping for calculating temperature closest to 0
app.post("/calc", async (req, res) => {
    try {
        console.log("Received POST request");
        const content = req.body.temperatures;
        let closest = findCloseToZero(content);
        // if the returned value is null, one of the provided values was of the wrong type
        (closest !== null) ? (res.end(closest.toString())) : (res.status(400).json({ error: "Please provide numerical values only." }));

    } catch (err) {
        res.status(400).json({ error: "Please check the contents and syntax of the payload and try again!" });
    }

})

// Default error handler for malformed requests
app.use((err, req, res, next) => {
    return res.status(400).json({ error: "Please check the contents and syntax of the payload and try again!" });
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
})