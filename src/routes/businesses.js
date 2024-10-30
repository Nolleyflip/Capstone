const { Router } = require('express')
const router = Router()
const {validationMiddleware} = require('../middlewares/validations-middleware')
const {getAllBusinesses, getBusinessById, createBusiness, updateBusiness, deleteBusiness}= require('../controllers/businesses')
const { validateCreate, validateUpdate } = require('../validators/businesses')



router.get('/businesses', getAllBusinesses);
router.get('/businesses/:id', getBusinessById);
router.post('/businesses', validateCreate, validationMiddleware ,  createBusiness);
router.put('/businesses/:id', validateUpdate, validationMiddleware, updateBusiness);
router.delete('/businesses/:id', deleteBusiness);

module.exports = router
