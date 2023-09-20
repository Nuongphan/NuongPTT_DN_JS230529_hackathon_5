const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const fs = require("fs");
const bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());
app.get("/api/v1/games", (req, res) => {
  const dataGames = JSON.parse(fs.readFileSync("./database.json"));
  res.status(200).json(dataGames);
});
app.get("/api/v1/games/:id", (req, res) => {
  const id = req.params.id;
  const dataGames = JSON.parse(fs.readFileSync("./database.json"));
  const game = dataGames.find((item) => item.id == id);
  if (game) {
    res.status(200).send(game);
  } else {
    res.status(404).send("not found");
  }
});
app.post("/api/v1/games", (req, res) => {
  const dataInput = req.body;
  console.log(1111, dataInput);
  const dataGames = JSON.parse(fs.readFileSync("./database.json"));
  const newGame = {
    id: Math.floor(Math.random() * 100),
    players: [
      {
        playerId: Math.floor(Math.random() * 100),
        name: dataInput.player1,
        round: [{ idRound: 1, soccer: 0 }],
      },
      {
        playerId: Math.floor(Math.random() * 100),
        name: dataInput.player2,
        round: [{ idRound: 1, soccer: 0 }],
      },
      {
        playerId: Math.floor(Math.random() * 100),
        name: dataInput.player3,
        round: [{ idRound: 1, soccer: 0 }],
      },
      {
        playerId: Math.floor(Math.random() * 100),
        name: dataInput.player4,
        round: [{ idRound: 1, soccer: 0 }],
      },
    ],
  };
  dataGames.push(newGame);
  fs.writeFileSync("./database.json", JSON.stringify(dataGames));
  res.status(200).send("Game created successfully");
});

app.listen(port, () => {
  console.log("http://localhost:3500/");
});
