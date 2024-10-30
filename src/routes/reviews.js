const { Router } = require('express')
const { 
  createReview, 
  getReviews, 
  getReviewsByBusiness, 
  getBusinessReviewsWithResponses,
  updateReview, 
  deleteReview,
  createResponse,
  updateResponse,
  deleteResponse
} = require('../controllers/reviews')
const { userAuth } = require('../middlewares/auth-middleware')
const { validateReview, validateResponse,validateResponseUpdate, validateResponseDelete } = require('../validators/reviews')
const { validationMiddleware } = require('../middlewares/validations-middleware')
console.log(getReviewsByBusiness)

const router = Router()
router.post('/business/:business_id', userAuth, validateReview, validationMiddleware, createReview)
router.get('/', getReviews)
router.get('/business/:business_id', getBusinessReviewsWithResponses)
router.put('/business/:id', userAuth, validateReview, updateReview)
router.delete('/business/:id', userAuth, deleteReview)

router.post('/response', userAuth,validateResponse, createResponse)
router.put('/response/:id', userAuth, validateResponseUpdate, updateResponse);
router.delete('/response/:id',userAuth, validateResponseDelete, deleteResponse);

module.exports = router
