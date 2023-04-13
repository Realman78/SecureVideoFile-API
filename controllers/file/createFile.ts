import File, { IFile } from '../../models/FileSchema'
import { Request, Response } from 'express'

type FileBody = {
    url: string;
    name: string;
    owner: string;
}

const createFile = async (req: Request<{}, {}, { url: string, name: string }, {}>, res: Response) => {
    try {
        const { url, name } = req.body

        const fileExists = await File.exists({
            owner: req.user.userId,
            name
        })
        if (fileExists) {
            return res.status(409).send({ message: 'File already exists.' })
        }

        const fileBody: FileBody = {
            name, url, owner: req.user.userId
        }

        const newFile: IFile | null = await File.create(fileBody)

        res.status(201).send({ message: 'File created.', file: newFile })
    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}
export default createFile