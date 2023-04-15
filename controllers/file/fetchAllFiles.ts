import File from '../../models/FileSchema'
import { Request, Response } from 'express'

const fetchAllFiles = async (req: Request<{}, {}, {}, {}>, res: Response) => {
    try {
        const files = await File.find({
            owner: req.user.userId
        })

        res.status(200).send({ message: `${files.length} file${files.length === 1 ? "" : "s"} fetched`, files: files })
    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}
export default fetchAllFiles