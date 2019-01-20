import express from "express";
import * as presets from "./modules/presets";
import genImageData from "./modules/genImageData";
import * as utils from "./modules/utils";

console.log(utils.default.newtDiv(40, 23, 75));

const app = express();

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/genImageData.json", async (req, res) => {

    try {
        let request = await genImageData.gen(presets.default.getAbsOneFns(5, 800, 800, 15));

        res.json(request);
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(8080, () => console.log("server running on port 8080"));