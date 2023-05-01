const { Router } = require('express');

const router = Router();

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

// Rotas contatos
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.get('/contacts', ContactController.index);
router.put('/contacts/:id', ContactController.update);

// Rotas categoria
router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
module.exports = router;
