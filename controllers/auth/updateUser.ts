import User from "../../models/UserSchema";
import { Request, Response } from 'express'

const updateUser = async (req: Request<{}, {}, { username: string }, {}>, res: Response) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).send({ msg: "No name provided." });
        }

        const userToUpdate = await User.findByIdAndUpdate(req.user.userId, { username }, { new: true });
        if (!userToUpdate) {
            return res.status(404).send({ msg: "No user found." });
        }

        return res.status(200).send({ msg: "User Updated.", userDetails: userToUpdate });
    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default updateUser