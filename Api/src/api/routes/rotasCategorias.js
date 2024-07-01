const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  description: String,
  type: String,
});

const Category = mongoose.model("Category", categoriesSchema);

router.get("/", async (req, res) => {
  try {
    const foundedCategories = await Category.find();
    console.log("Categorias encontrados com sucesso!");
    res.status(200).json(foundedCategories);
  } catch (error) {
    console.error("Erro ao encontrar Categorias:", err.message);
    res
      .status(500)
      .json({ error: "Erro durante a tentativa de encontrar Categorias" });
  }
});

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedCategory = await Category.findById(pid);
    console.log('Categoria encontrada com sucesso!');
    res.json(foundedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  const category = req.body.category;
  try {
    const newCategory = await Category.create(category);
    console.log("Categoria salva com sucesso!");
    res.json({ message: "Categoria salva com sucesso!", newCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedCategory = await Category.findByIdAndDelete(pid);
    console.log('Categoria deletada:', deletedCategory);
    res.status(200).json({ message: 'Categoria deletada com sucesso!', deletedCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const newCategory = req.body.category;
  console.log(newCategory);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(pid, 
      { 
        description: newCategory.description, 
        type: newCategory.type,
      }, { new: true });
    console.log('Categoria Atualizada:', updatedCategory);
    res.json({ message: 'Categoria alterada com sucesso!', updatedCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
