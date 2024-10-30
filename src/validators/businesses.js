const { check } = require('express-validator');

const businessValidation = {
  validateCreate: [
    check('owner_id')
      .optional()
      .isInt()
      .withMessage('Valid owner ID is required'),
      
    check('business_name')
      .notEmpty()
      .isLength({ min: 2, max: 100 })
      .trim()
      .withMessage('Business name must be between 2 and 100 characters'),
      
    check('address')
      .notEmpty()
      .isLength({ min: 5, max: 255 })
      .trim()
      .withMessage('Valid address is required'),
      
    check('phone_number')
      .optional()
      .matches(/^\+?[\d\s-]+$/)
      .withMessage('Invalid phone number format'),
      
    check('operating_hours')
      .optional()
      .isLength({ max: 100 })
      .withMessage('Operating hours must not exceed 100 characters'),
      
    check('website')
      .optional()
      .isURL()
      .isLength({ max: 255 })
      .withMessage('Invalid website URL')
  ],

  validateUpdate: [
    check('business_name')
      .optional()
      .isLength({ min: 2, max: 100 })
      .trim()
      .withMessage('Business name must be between 2 and 100 characters'),
      
    check('address')
      .optional()
      .isLength({ min: 5, max: 255 })
      .trim()
      .withMessage('Valid address is required'),
      
    check('phone_number')
      .optional()
      .matches(/^\+?[\d\s-]+$/)
      .withMessage('Invalid phone number format'),
      
    check('operating_hours')
      .optional()
      .isLength({ max: 100 })
      .withMessage('Operating hours must not exceed 100 characters'),
      
    check('website')
      .optional()
      .isURL()
      .isLength({ max: 255 })
      .withMessage('Invalid website URL')
  ],

  validateId: [
    check('id')
      .notEmpty()
      .isInt()
      .withMessage('Valid business ID is required')
  ],


};

module.exports = businessValidation;
