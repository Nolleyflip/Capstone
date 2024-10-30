const { check } = require('express-validator')

const pool = require('../db')

const validateReview = [
  check('business_id')
    .exists()
    .isInt({ min: 1 })
    .withMessage('Valid business ID is required'),

  check('rating')
    .exists()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  check('review_text')
    .exists()
    .isString()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Review text must be between 10 and 1000 characters'),

  check('business_id').custom(async (business_id, { req }) => {
    const existingReview = await pool.query(
      'SELECT * FROM reviews WHERE user_id = $1 AND business_id = $2',
      [req.user.id, business_id]
    )
    if (existingReview.rows.length > 0) {
      throw new Error('You have already reviewed this business')
    }
    return true
  }),


]

const validateResponse = [
  check('review_id')
    .exists()
    .notEmpty()
    .isInt()
    .withMessage('Review ID must be a valid integer'),
    
  check('business_id')
    .exists()
    .notEmpty()
    .isInt()
    .withMessage('Business ID must be a valid integer'),
    
  check('response_text')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Response text must be between 1 and 1000 characters'),
    
 
];

const validateResponseUpdate = [
  check('response_text')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Response text must be between 1 and 1000 characters'),
    
 
];

const validateResponseDelete = [
  check('id')
    .exists()
    .notEmpty()
    .isInt()
    .withMessage('Response ID must be a valid integer'),
    

];

module.exports = { validateReview, validateResponse, validateResponseUpdate, validateResponseDelete } 
