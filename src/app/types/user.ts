import { Role } from '@/auth/auth.enum';
import { $enum } from 'ts-enum-util';

export interface IName {
  first: string;
  middle?: string;
  last: string;
}

export interface IUser {
  _id: string;
  email: string;
  username: string;
  name: IName;
  picture: string;
  role: Role | string;
  userStatus: boolean;
  dateOfBirth: Date | null | string;
  level: number;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  readonly fullName?: string;
}

export class User implements IUser {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id = '',
    public email = '',
    public username = '',
    public name = { first: '', middle: '', last: '' } as IName,
    public picture = '',
    public role = Role.None,
    public dateOfBirth: Date | null = null,
    public userStatus = false,
    public level = 0,
    public address = {
      line1: '',
      city: '',
      state: '',
      zip: '',
    },
    public phone = ''
  ) {}

  static Build(user: IUser) {
    if (!user) {
      return new User();
    }

    return new User(
      user._id,
      user.email,
      user.username,
      user.name,
      user.picture,
      $enum(Role).asValueOrDefault(user.role, Role.None),
      typeof user.dateOfBirth === 'string'
        ? new Date(user.dateOfBirth)
        : user.dateOfBirth,
      user.userStatus,
      user.level,
      user.address,
      user.phone
    );
  }

  public get fullName(): string {
    if (!this.name) {
      return '';
    }

    if (this.name.middle) {
      return `${this.name.first} ${this.name.middle} ${this.name.last}`;
    }
    return `${this.name.first} ${this.name.last}`;
  }

  toJSON(): object {
    const serialized = Object.assign(this);
    delete serialized._id;
    delete serialized.fullName;
    return serialized;
  }
}
