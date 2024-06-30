const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usuariosFilePath = path.join(__dirname, "data", "usuarios.json");

async function authenticateUser(req, res) {
  const { username, password } = req.body;

  try {
    const usuariosData = await fs.promises.readFile(usuariosFilePath, "utf-8");
    const usuarios = JSON.parse(usuariosData);

    const usuario = usuarios.find((user) => user.nomeUsuario === username && user.status == "on");

    if (!usuario) {
      return res.redirect("/login?error=1");
    }

    const match = await bcrypt.compare(password, usuario.senha);

    if (match) {
      req.session.user = usuario.nomeUsuario;
      res.redirect("/admin");
    } else {
      res.redirect("/login?error=1");
    }
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.redirect("/login?error=1");
  }
}

function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao fazer logout:", err);
    }
    res.redirect("/login");
  });
}

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

async function generateEncryptedPassword(pwd) {
    try {
      const hash = await bcrypt.hash(pwd, 10); 
      return hash;
    } catch (error) {
      console.error('Erro ao gerar hash:', error);
      throw error;
    }
  }

module.exports = { authenticateUser, logoutUser, isAuthenticated, generateEncryptedPassword };
