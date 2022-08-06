import { NextFunction, Request, Response } from 'express'
import { IUserService } from '../utils/interfaces/services.interfaces'
import { processError } from '../utils/helpers'
import { Inject, Service } from 'typedi'
import UserService from '../services/user.service'
import { CreateUserDto } from 'src/utils/dtos/users.dto'

@Service()
export class UserController {

    constructor(@Inject('user_service') public userService: IUserService) {
        this.userService = userService
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        const createUserDto: CreateUserDto = req.body
        try {
            const user = await this.userService.createUser(createUserDto)
            return res.status(201).send({
                message: 'Successfully created user',
                status: 'success',
                user
            })
        } catch (err: any) {
            return processError(res, err)
        }
    }

    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getUsers()
            return res.send({
                message: 'All users',
                status: 'success',
                users
            })
        } catch (err: any) {
            return processError(res, err)
        }
    }
}
