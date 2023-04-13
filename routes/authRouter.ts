import express from 'express'
const router = express.Router()

import Joi from 'joi'

import ejv from 'express-joi-validation'
const validator = ejv.createValidator({})

import { postRegister, errorHandler, postLogin, getUser, verifyUser, resendConfirmationMail, resetPassword, updateUser } from '../controllers/auth/authController'
import { protect } from '../middleware/authMiddleware'

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(24).required(),
    password: Joi.string().min(8).max(48).required(),
    mail: Joi.string().email().required(),
})
const loginSchema = Joi.object({
    mail: Joi.string().required(),
    password: Joi.string().min(8).max(48).required(),
})
const updateSchema = Joi.object({
    username: Joi.string().min(3).max(24).required(),
})

router.get('/get/me', protect, getUser)
router.post('/register', validator.body(registerSchema), postRegister)
router.post('/login', validator.body(loginSchema), postLogin)
router.get('/confirm/:code', verifyUser)
router.get('/confirm/resend/:id', resendConfirmationMail)
router.patch('/update', validator.body(updateSchema), protect, updateUser)
router.patch('/reset', protect, resetPassword)


router.use('/*', errorHandler)
// router.post('/*', errorHandler)
// router.put('/*', errorHandler)
// router.delete('/*', errorHandler)


export default router