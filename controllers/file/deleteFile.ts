import File from "../../models/FileSchema";
import { Request, Response } from 'express'

const deleteFile = async (req: Request<{ id: string }, {}, {}, {}>, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ msg: "No ID provided." });
        }

        const fileToDelete = await File.findOneAndDelete({ owner: req.user.userId, _id: id });
        if (!fileToDelete) {
            return res.status(404).send({ msg: "No File found." });
        }

        return res.status(200).send({ msg: "File deleted", file: fileToDelete });
    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default deleteFile