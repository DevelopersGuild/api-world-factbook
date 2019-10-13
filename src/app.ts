import express from "express";
import countries from "./controllers/countries";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/countries", countries);
app.get("/", (_, res) => res.send("CIA World Factbook API 🇺🇸🕵🏼‍♀️"));

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
