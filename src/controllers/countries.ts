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

router.get("/search", async (req, res) => {
    if (!req.query.country || req.query.country.length < 1 || !req.query.country.includes("geos/")) {
        res.status(400).send("The country query must be valid example ?country=geos/af.html");
    } else {
        const dataCrawler = await DataCrawler(`https://www.cia.gov/library/publications/resources/the-world-factbook/${req.query.country}`);
        const objects = await dataCrawler.gatherHTML();
        res.status(200).send(objects.filter((e) => e.attributes.get("id"))
            .filter((e) => e.attributes.get("id").includes("-category-section")));
    }
});

export default router;
