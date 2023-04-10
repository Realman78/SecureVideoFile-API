import User, { IUser } from '../../models/UserSchema'
import { Request, Response } from 'express'

const getUser = async (req: Request<{}, {}, {}, {}>, res: Response) => {
    const userId = req.user.userId
    const user = await User.findById(userId)

    if (!user) {
        //TODO logout user
        return res.status(404).send({msg: "User not found."})
    }

    return {userDetails: user}
}

export default getUser