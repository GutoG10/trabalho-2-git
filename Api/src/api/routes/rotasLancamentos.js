const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const entriesSchema = new mongoose.Schema({
    type: String,
    category: String,
    description: String,
    value: Number,
    payment_date: String,
    due_date: String,
    account: String,
    status: String
})

const Entry = mongoose.model('Entry', entriesSchema);

router.get("/", async (req, res) => {
    try {
        const foundedEntries = await Entry.find();
        console.log('Lançamentos encontrados com sucesso!');
        res.status(200).json(foundedEntries);
    } catch (error) {
        console.error('Erro ao encontrar Lançamentos:', err.message);
      res.status(500).json({ error: 'Erro durante a tentativa de encontrar Lançamentos' });
    }
}) 

router.post("/", async (req, res) => {
    const entry = req.body.entries
    try {
        const newEntry = await Entry.create(entry);
        console.log('Objeto salvo com sucesso!');
        res.json({ message: 'Lançamento salvo com sucesso!', newEntry });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });



module.exports = router;
