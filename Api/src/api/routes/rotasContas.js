const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    description: String,
    comment: String,
})

const Account = mongoose.model('Account', accountSchema);

router.get("/", async (req, res) => {
    try {
        const foundedAccount = await Account.find();
        console.log('Contas encontrados com sucesso!');
        res.status(200).json(foundedAccount);
    } catch (error) {
        console.error('Erro ao encontrar Contas:', err.message);
      res.status(500).json({ error: 'Erro durante a tentativa de encontrar Contas' });
    }
})

router.post("/", async (req, res) => {
    console.log("caiu")
    const account = req.body.account
    try {
        const newAccount = await Account.create(account);
        console.log('Objeto salvo com sucesso!');
        res.json({ message: 'Conta salva com sucesso!', newAccount });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });


module.exports = router;