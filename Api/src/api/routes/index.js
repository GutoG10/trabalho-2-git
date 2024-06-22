const express = require('express')
const router = express.Router()
const rotasLancamentos = require('./rotasLancamentos')
const rotasCategorias = require('./rotasCategorias')
const rotasContas = require('./rotasContas')
const rotasUsuarios = require('./rotasUsuarios')


router.use(express.json())
router.use('/categorias', rotasCategorias)
router.use('/lancamentos', rotasLancamentos)
router.use('/contas', rotasContas)
router.use('/usuarios', rotasUsuarios)

module.exports = router