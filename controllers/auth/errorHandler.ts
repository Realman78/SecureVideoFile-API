import { Request, Response } from 'express'

const errorHandler = async (req: Request, res: Response) => {
    return res.status(404).send({ message: 'Auth API path not found. ERROR 404.' })
}
export default errorHandler