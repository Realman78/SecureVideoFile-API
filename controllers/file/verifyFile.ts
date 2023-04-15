import File from '../../models/FileSchema'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

const verifyFile = async (req: Request<{ id: string }, {}, { accessCode: string; }, {}>, res: Response) => {
    try {
        const { id } = req.params
        const { accessCode } = req.body

        const file = await File.findOne({owner: req.user.userId, _id: id})
        
        if (!file) {
            return res.status(404).send({ message: 'No file found.' })
        }

        if ((await bcrypt.compare(accessCode, file.accessCode))) {
            return res.status(200).send({ message: 'File approved.', file: file, approved: true })
        }else { 
            return res.status(401).send({ message: 'Incorrect file access code.', approved: false })
        }
    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}
export default verifyFile