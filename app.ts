import express from "express";
import collection from "./mongo";
import cors from "cors";
const app = express();
app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(cors);

app.get("/login", cors(), (req, res) => {});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
});
