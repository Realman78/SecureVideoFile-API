import User from '../../models/UserSchema'
import { Request, Response } from 'express'

const getUser = async (req: Request<{}, {}, {}, {}>, res: Response) => {
    try {
        const userId = req.user.userId
        const user = await User.findById(userId)

        if (!user) {
            //TODO logout user
            return res.status(404).send({ msg: "User not found." })
        }

        return res.status(200).send({ userDetails: user })
    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default getUser