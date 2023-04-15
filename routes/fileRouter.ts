import express from 'express'
const router = express.Router()

import Joi from 'joi'

import ejv from 'express-joi-validation'
const validator = ejv.createValidator({})

import { errorHandler, createFile, fetchFile, deleteFile, updateFile, fetchAllFiles } from '../controllers/file/fileController'
import { protect } from '../middleware/authMiddleware'

const uploadSchema = Joi.object({
    name: Joi.string().min(1).required(),
    url: Joi.string().min(1).required(),
    accessCode: Joi.string().min(4).required()
})
const fetchSchema = Joi.object({
    identifier: Joi.string().min(1).required(),
})
const updateSchema = Joi.object({
    name: Joi.string().min(1).required(),
})

router.get('/fetch/all', protect, fetchAllFiles)
router.post('/fetch', validator.body(fetchSchema), protect, fetchFile)
router.post('/create', validator.body(uploadSchema), protect, createFile)
router.patch('/update/:id', validator.body(updateSchema), protect, updateFile)
router.delete('/delete/:id', protect, deleteFile);

router.use('/*', errorHandler)
// router.post('/*', errorHandler)
// router.put('/*', errorHandler)
// router.delete('/*', errorHandler)


export default router