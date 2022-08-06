import { nanoid } from 'nanoid';
import { CreateUserDto } from 'src/utils/dtos/users.dto';
import { IUser } from 'src/utils/interfaces/entities.interfaces';
import { IUserRepository } from 'src/utils/interfaces/repos.interfaces';
import User from '../entities/user.entity';
import { In } from 'typeorm'

export default class UserRepository implements IUserRepository {
    async findByIds(ids: number[]): Promise<IUser[]> {
        const users = await User.find(
            {
                where: { id: In(ids) }
            }
        )
        return users
    }

    async create(userData: CreateUserDto) {
        const user = User.create({
            ...userData,
        })

        return user.save()
    }

    async findAll(): Promise<IUser[]> {
        return await User.find({})
    }

}
