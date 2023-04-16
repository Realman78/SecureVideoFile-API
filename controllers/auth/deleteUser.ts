import User from '../../models/UserSchema'
import File from '../../models/FileSchema'
import { Request, Response } from 'express'

const deleteUser = async (req: Request<{}, {}, {}, {}>, res: Response) => {
    const userId = req.user.userId
    const user = await User.findByIdAndDelete(userId)

    if (!user) {
        return res.status(404).send({ msg: "User not found." })
    }

    const userFiles = await File.find({
        owner: userId
    })

    return res.send({ deletedUser: user, userFiles })
}

export default deleteUser