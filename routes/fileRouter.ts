import express from 'express'
const router = express.Router()

import Joi from 'joi'

import ejv from 'express-joi-validation'
const validator = ejv.createValidator({})

import { errorHandler } from '../controllers/file/fileController'
// import { protect } from '../middleware/authMiddleware'

const uploadSchema = Joi.object({
    username: Joi.string().min(3).max(24).required(),
    password: Joi.string().min(8).max(48).required(),
    mail: Joi.string().email().required(),
})

// router.get('/get/me', protect, getUser)


router.use('/*', errorHandler)
// router.post('/*', errorHandler)
// router.put('/*', errorHandler)
// router.delete('/*', errorHandler)


export default router