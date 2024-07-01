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
});

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedEntry = await Entry.findById(pid);
    console.log('Lançamento encontrado com sucesso!');
    res.json(foundedEntry);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
    const entry = req.body.entries
    try {
        const newEntry = await Entry.create(entry);
        console.log('Lançamento salvo com sucesso!');
        res.json({ message: 'Lançamento salvo com sucesso!', newEntry });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const newEntry = req.body.entry;
  console.log(newEntry);
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(pid, 
      { 
        category: newEntry.category,
        description: newEntry.description,
        value: newEntry.value,
        payment_date: newEntry.payment_date,
        due_date: newEntry.due_date,
        account: newEntry.account,
        status: newEntry.status,
      }, { new: true });
    console.log('Lançamento Atualizado:', updatedEntry);
    res.json({ message: 'Lançamento alterado com sucesso!', updatedEntry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedEntry = await Entry.findByIdAndDelete(pid);
    console.log('Lançamento deletado:', deletedEntry);
    res.status(200).json({ message: 'Lançamento deletado com sucesso!', deletedEntry });
  } catch (err) {
    console.log("Deu problema: ",err)
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;
