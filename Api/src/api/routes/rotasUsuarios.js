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

const User = mongoose.model("User", UserSchema);

router.get("/", async (req, res) => {
  try {
    const foundedUser = await User.find();
    console.log("Objetos encontrados com sucesso!");
    res.status(200).json(foundedUser);
  } catch (error) {
    console.error("Erro ao encontrar Usuários:", error.message);
    res
      .status(500)
      .json({ error: "Erro durante a tentativa de encontrar usuários" });
  }
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedUser = await User.findById(pid);
    console.log("Objeto encontrado com sucesso!");
    res.json(foundedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  const { user } = req.body;
  const hashedPwd = await bcrypt.hash(user.pwd, 10); // 10 é o número de salt rounds
  user.pwd = hashedPwd;
  try {
    // Criptografar a senha antes de salvar
    const newUser = await User.create(user);

    console.log("Usuario salvo com sucesso!");
    res.json({ message: "Usuário salvo com sucesso!", newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const foundedUser = await User.findOne({ email });

    if (foundedUser) {
      if (foundedUser.status === "on") {
        const match = bcrypt.compare(senha, foundedUser.pwd);

        if (match) {
          console.log("Usuário autenticado com sucesso!");
          res.json({ email: foundedUser.email });
        } else {
          res.status(401).json({ message: "Credenciais inválidas" });
        }
      }
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedUser = await User.findByIdAndDelete(pid);
    console.log("Usuário deletado:", deletedUser);
    res
      .status(200)
      .json({ message: "Usuário deletado com sucesso!", deletedUser });
  } catch (err) {
    console.log("Deu problema: ", err);
    res.status(400).json({ message: err.message });
  }
});

router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const newUser = req.body.user;
  console.log(newUser);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      pid,
      {
        name: newUser.name,
        email: newUser.email,
        user: newUser.user,
        level: newUser.level,
        status: newUser.status,
      },
      { new: true }
    );
    console.log("Usuário Atualizado:", updatedUser);
    res.json({ message: "Usuário alterado com sucesso!", updatedUser });
    //res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
