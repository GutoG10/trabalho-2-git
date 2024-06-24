const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    description: String,
    type: String,
})

const Category = mongoose.model('Category', categoriesSchema);

router.get("/", async (req, res) => {
    try {
        const foundedCategories = await Category.find();
        console.log('Categorias encontrados com sucesso!');
        res.status(200).json(foundedCategories);
    } catch (error) {
        console.error('Erro ao encontrar Categorias:', err.message);
      res.status(500).json({ error: 'Erro durante a tentativa de encontrar Categorias' });
    }
})

router.post("/", async (req, res) => {
    console.log("caiu")
    const category = req.body.category
    try {
        const newCategory = await Category.create(category);
        console.log('Objeto salvo com sucesso!');
        res.json({ message: 'Categoria salva com sucesso!', newCategory });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
module.exports = router
