import User, { IUser } from '../../models/UserSchema'
import { Request, Response } from 'express'

const verifyUser = async (req: Request<{ code: string }, {}, {}, {}>, res: Response) => {
    try {
        if (!req.params.code) return res.status(400).send({ message: 'No code provided.' })
        const user: IUser | null = await User.findOne({ confirmationCode: req.params.code })
        console.log(new Date())
        console.log(user)

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired confirmation code' });
        }
        // await user.updateOne({status: "Active"})
        return res.status(200).send({ message: 'User verified successfully. Please log in.' })
    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}
export default verifyUser