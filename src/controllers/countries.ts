import { DataCrawler } from "@calba1114/autoscrape";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
    const dataCrawler = await DataCrawler("https://www.cia.gov/library/publications/resources/the-world-factbook/index.html");
    const objects = await dataCrawler.trans("#search-place option");
    res.status(200).send(objects.map((e) => ({
        data_place_code: e.attributes.get("data-place-code"),
        name: e.textContent,
        value: e.attributes.get("value"),
    })).splice(1));
});

export default router;
