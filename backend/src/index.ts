import cors from "cors";
import express from "express";
import fs from "node:fs";
import { SearchInputError, type SearchInput, type User } from "./types";

const port = 3000;

const data = JSON.parse(
    fs.readFileSync("./data.json", { encoding: "utf8" })
) as User[];

const app = express();

app.use(cors());

app.get("/", (_, res) => {
    res.json({ message: "Nothing to see here." });
});

app.get<{}, User[] | SearchInputError, {}, SearchInput>(
    "/search",
    (req, res) => {
        setTimeout(() => {
            const { email = "", number = "" } = req.query;

            if (email.length < 1) {
                res.json({ message: "Please enter email address" }).status(400);
                return;
            }

            const users = data.filter((user) => {
                if (
                    user.email.includes(email) &&
                    (number.length < 1 || user.number.includes(number))
                ) {
                    return user;
                }
                return false;
            });
            res.json(users);
        }, 5_000);
    }
);

app.listen(port, () => {
    console.log(`Started @ http://localhost:${port}`);
});
