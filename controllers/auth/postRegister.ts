import User, { IUser } from '../../models/UserSchema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { Request, Response } from 'express'
import { sendConfirmationEmail } from '../../utils/utils'


type UserBody = {
    username: string;
    password: string;
    mail: string;
    confirmationCode: string;
    status?: string;
    confirmationCodeExpiresAt: Date;
}

const postRegister = async (req: Request<{}, {}, { username: string, password: string, mail: string }, {}>, res: Response) => {
    try {
        let { username, password, mail } = req.body

        const mailTaken = await User.exists({ mail: mail.toLowerCase() })
        if (mailTaken) {
            return res.status(409).send({ message: 'E-mail already in use.' })
        }
        const usernameTaken = await User.exists({ username: username.toLowerCase() })
        if (usernameTaken) {
            return res.status(409).send({ message: 'Username taken.' })
        }

        const encryptedPassword: string = await bcrypt.hash(password, 10)
        const timestamp: number = new Date().getTime()
        const confirmationCode: string = jwt.sign({ mail, timestamp }, process.env.TOKEN_KEY as string)

        const userBody: UserBody = {
            username, password: encryptedPassword, mail: mail.toLowerCase(), confirmationCode, confirmationCodeExpiresAt: moment().add(1, 'hour').toDate()
        }

        const user: IUser | null = await User.create(userBody)

        sendConfirmationEmail(username, mail, confirmationCode)

        const token = jwt.sign({
            userId: user._id,
            mail,
            username,
            status: user.status
        }, process.env.TOKEN_KEY as string, { expiresIn: '30d' })

        res.status(201).json({
            userDetails: {
                mail: user.mail,
                token,
                username: user.username,
                _id: user._id
            },
        })

    } catch (e: any) {
        console.log(e)
        return res.status(500).send({ message: "Error occured. Please try again.", error: e.message })
    }
}
export default postRegister