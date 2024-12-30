const { body } = require('express-validator');

const addTaskValidations = [
  body('title')
    .notEmpty().withMessage('El título es obligatorio.')
    .isLength({ min: 3, max: 50 }).withMessage('El título debe tener entre 3 y 100 caracteres.'),
  
  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('La descripción no puede exceder los 500 caracteres.'),
  
  body('state')
    .isBoolean().withMessage('El estado debe ser un valor booleano (true o false).'),
  
  body('createdDate')
    .optional()
    .isISO8601().withMessage('La fecha debe ser una fecha válida en formato ISO8601.'),
];

module.exports = { addTaskValidations}