import Joi from 'joi';

export interface UserProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  followers: number;
  following: number;
  publications: number;
  bio: string;
}

export class User {
  private _props: UserProps = {
    name: '',
    email: '',
    password: '',
    avatar: '',
    followers: 0,
    following: 0,
    publications: 0,
    bio: ''
  };

  get name(): string {
    return this._props.name;
  }

  set name(value: string) {
    this._props.name = value;
  }

  get email(): string {
    return this._props.email;
  }

  set email(value: string) {
    this._props.email = value;
  }

  get password(): string {
    return this._props.password;
  }

  set password(value: string) {
    this._props.password = value;
  }

  get avatar(): string {
    return this._props.avatar;
  }

  set avatar(value: string) {
    this._props.avatar = value;
  }

  get followers(): number {
    return this._props.followers;
  }

  get following(): number {
    return this._props.following;
  }

  get publications(): number {
    return this._props.publications;
  }

  get bio(): string {
    return this._props.bio;
  }

  set bio(value: string) {
    this._props.bio = value;
  }

  constructor(props: UserProps) {
    this._props = {
      name: props.name ?? '',
      email: props.email ?? '',
      password: props.password ?? '',
      avatar: props.avatar ?? '',
      followers: 0,
      following: 0,
      publications: 0,
      bio: props.bio ?? ''
    };
    this.validate();
  }

  private validate(): void {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      avatar: Joi.string(),
      followers: Joi.number(),
      following: Joi.number(),
      publications: Joi.number(),
      bio: Joi.string()
    });

    const { error } = schema.validate(this._props);
    if (error) throw new Error(error.details[0].message);
  }
}
