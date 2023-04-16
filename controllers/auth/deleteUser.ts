import User from '../../models/UserSchema'
import File from '../../models/FileSchema'
import { Request, Response } from 'express'

const deleteUser = async (req: Request<{}, {}, {}, {}>, res: Response) => {
    try {
        const userId = req.user.userId
        const user = await User.findByIdAndDelete(userId)

        if (!user) {
            return res.status(404).send({ msg: "User not found." })
        }

        const userFiles = await File.find({ owner: userId })

        await File.deleteMany({
            owner: userId
        })

        return res.status(200).send({ deletedUser: user, userFiles })
    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default deleteUser