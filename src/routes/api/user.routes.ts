import { Router } from 'express'
import UserService from '../../services/user.service'
import { UserController } from '../../controllers/user.controller'
import Container from 'typedi'
import UserRepository from '../../repositories/user.respository'
import { createUserBodySchema } from '../../schemas/user.schemas'
import validateRequest from '../../middlewares/validator'

const userRouter: Router = Router()

Container.set({ id: 'user_repository', type: UserRepository })
Container.set({ id: 'user_service', type: UserService })
const userController = Container.get(UserController)

userRouter.get('/',
    userController.getAllUsers.bind(userController))

userRouter.post('/', validateRequest(createUserBodySchema),
    userController.createUser.bind(userController))

export default userRouter
