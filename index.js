const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

const agenda = [];

app.get("/", (req, res) => {
  return res.json("API rodando");
});

app.get("/agenda", (req, res) => {
  return res.json(agenda);
});

app.post("/agenda", (req, res) => {
  const { tema, describ, Npoints } = req.body;
  console.log("Tema:", tema, "Descrição:", describ, "Total de votos:", Npoints);
  const newAgenda = {
    id: Math.random().toString(36),
    tema,
    describ,
    Npoints,
  };

  agenda.push(newAgenda);
  return res.json(newAgenda);
});

app.delete("/agenda/:id", (req, res) => {
  const { id } = req.params;

  const index = agenda.findIndex((item) => item.id === id);  

  if (index < 0) {
    return res.status(404).json({ error: "Item não encontrado" });
  }

  agenda.splice(index, 1);
  return res.status(204).json();
});

app.listen(port, () => console.log(`listening on ${port}`));
