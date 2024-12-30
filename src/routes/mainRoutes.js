const express = require('express');

const router = express.Router();

const mainController = require('../controllers/mainController');
const { editTaskValidations } = require('../middlewares/editTaskValidations');
const { addTaskValidations } = require('../middlewares/addTaskValidations');



router.get('/getAll', mainController.getAll)
router.get('/getById/:id', mainController.getById)
router.post('/create', addTaskValidations, mainController.create)
router.put('/edit/:id', editTaskValidations, mainController.edit)
router.delete('/delete/:id', mainController.delete)

module.exports = router;