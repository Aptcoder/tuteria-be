import { IUserRepository } from '../utils/interfaces/repos.interfaces'

import { IUserService } from 'src/utils/interfaces/services.interfaces'
import { Service, Inject } from 'typedi'
import { CreateUserDto } from 'src/utils/dtos/users.dto'
import { IUser } from '../utils/interfaces/entities.interfaces'
import * as bcrypt from 'bcrypt'
import { ConflictError } from '../utils/errors'

@Service('user_service')
export default class UserService implements IUserService {
    constructor(@Inject('user_repository') public userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    private async _hashPassword(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email)
        if (existingUser) {
            throw new ConflictError('User with this email already exists')
        }
        const hashedPassword = await this._hashPassword(createUserDto.password)
        return this.userRepository.create({
            ...createUserDto,
            password: hashedPassword
        })
    }

    async getUsers(): Promise<IUser[]> {
        return this.userRepository.findAll()
    }
}
