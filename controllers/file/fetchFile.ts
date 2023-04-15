import File from '../../models/FileSchema'
import { Request, Response } from 'express'

const createFile = async (req: Request<{},{},{identifier: string},{}>, res: Response) => {
    try {
        const { identifier } = req.body

        const files = await File.find({
            owner: req.user.userId,
            $or: [{ name: identifier }, { url: identifier }],
        })

        if (!files || !files.length) {
            return res.status(404).send({msg: "File(s) with that identifier not found."})
        }

        res.status(200).send({message: 'File(s) fetched.', file: files})
    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}
export default createFile