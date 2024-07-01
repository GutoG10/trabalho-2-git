const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Definição do Schema e Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  user: String,
  pwd: String,
  level: String,
  status: String,
});

const User = mongoose.model('User', UserSchema);

router.get("/", async (req, res) => {
  try {
    const foundedUser = await User.find();
    console.log('Objetos encontrados com sucesso!');
    res.status(200).json(foundedUser);
  } catch (error) {
    console.error('Erro ao encontrar Usuários:', error.message);
    res.status(500).json({ error: 'Erro durante a tentativa de encontrar usuários' });
  }
});

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedUser = await User.findById(pid);
    console.log('Objeto encontrado com sucesso!');
    res.json(foundedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  const { user } = req.body;
  const hashedPwd = await bcrypt.hash(user.pwd, 10); // 10 é o número de salt rounds
  user.pwd = hashedPwd
  try {
    // Criptografar a senha antes de salvar
    console.log(user)
    const newUser = await User.create(user);

    console.log('Objeto salvo com sucesso!');
    res.json({ message: 'Usuário salvo com sucesso!', newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const foundedUser = await User.findOne({ email });

    if (foundedUser) {
      const match = bcrypt.compare(senha, foundedUser.pwd);

      if (match) {
        console.log('Usuário autenticado com sucesso!');
        res.json({ email: foundedUser.email });
      } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
