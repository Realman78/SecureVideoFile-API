import File from "../../models/FileSchema";
import { Request, Response } from 'express'

const updateFile = async (req: Request<{ id: string }, {}, { name: string }, {}>, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!id) {
            return res.status(400).send({ msg: "No ID provided." });
        }

        const fileToUpdate = await File.findOneAndUpdate({ owner: req.user.userId, _id: id }, { name }, { new: true });
        if (!fileToUpdate) {
            return res.status(404).send({ msg: "No File found." });
        }

        return res.status(200).send({ msg: "File Updated.", file: fileToUpdate });
    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default updateFile