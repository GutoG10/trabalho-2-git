const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  description: String,
  comment: String,
});

const Account = mongoose.model("Account", accountSchema);

router.get("/", async (req, res) => {
  try {
    const foundedAccount = await Account.find();
    console.log("Contas encontrados com sucesso!");
    res.status(200).json(foundedAccount);
  } catch (error) {
    console.error("Erro ao encontrar Contas:", err.message);
    res
      .status(500)
      .json({ error: "Erro durante a tentativa de encontrar Contas" });
  }
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedAccount = await Account.findById(pid);
    console.log("Conta encontrada com sucesso!");
    res.json(foundedAccount);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log("caiu");
  const account = req.body.account;
  try {
    const newAccount = await Account.create(account);
    console.log("Objeto salvo com sucesso!");
    res.json({ message: "Conta salva com sucesso!", newAccount });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedAccount = await Account.findByIdAndDelete(pid);
    console.log("Conta deletada:", deletedAccount);
    res
      .status(200)
      .json({ message: "Conta deletada com sucesso!", deletedAccount });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:pid', async (req, res) => {
  console.log("Veio pra cá");
  const pid = req.params.pid;
  const newAccount = req.body.account;
  try {
    const updatedAccount = await Account.findByIdAndUpdate(pid, 
      { 
        description: newAccount.description, 
        comment: newAccount.comment,
      }, { new: true });
    console.log('Conta atualizada:', updatedAccount);
    res.json({ message: 'Conta alterada com sucesso!', updatedAccount });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
