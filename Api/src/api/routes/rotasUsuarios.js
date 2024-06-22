const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


// Definição do Schema e Model
const UserSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
});
const User = mongoose.model('User', UserSchema);

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
      const user = await User.findOne({ email: email, senha: senha });
      if (user) {
          res.json({ success: true, message: "Login bem-sucedido", user: user });
      } else {
          res.json({ success: false, message: "Credenciais inválidas" });
      }
  } catch (err) {
      console.error('Erro durante a tentativa de login:', err.message);
      res.status(500).json({ error: 'Erro durante a tentativa de login' });
  }
});

module.exports = router;