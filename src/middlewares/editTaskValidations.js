const { body } = require('express-validator');

const editTaskValidations = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 100 }).withMessage('El título debe tener entre 3 y 100 caracteres.'),
    
  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('La descripción no puede exceder los 500 caracteres.'),
  
  body('state')
    .optional()
    .isBoolean().withMessage('El estado debe ser un valor booleano (true o false).'),
];

module.exports = { editTaskValidations}
