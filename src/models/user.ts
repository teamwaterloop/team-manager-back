import { Entity, Column, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm'
import { IsAlpha, Length, IsMobilePhone, IsEmail, IsOptional, IsBoolean, IsString } from 'class-validator'
import Base from './base'
import Team from './team'
import Authentication from './authentication'
import Position from './position'
import { Authority, PositionLevel, OAuthBearerWithRefresh } from '../types'

@Entity()
export default class User extends Base {
  @IsAlpha({message: 'You can only have letters in your name'})
  @Column()
  firstName: string

  @IsAlpha({message: 'You can only have letters in your name'})
  @Column()
  @Column()
  lastName: string

  @Length(60, 60)
  @Column({ length: 60 })
  password: string

  @IsOptional()
  @Column({ nullable: true })
  address?: string

  @IsOptional()
  @IsMobilePhone('en-CA')
  @Column({ nullable: true })
  phoneNumber: string

  @IsEmail()
  @Column({ unique: true, length: 100 })
  email: string

  @Column('enum', { enum: Authority, default: Authority.member })
  authority: Authority

  @IsBoolean()
  @Column({ default: false })
  slackAccess: boolean = false

  @IsOptional()
  @IsString()
  @Column({ unique: true, length: 50, default: null, nullable: true })
  slackTag?: string

  @OneToOne(type => Authentication, {
    nullable: true,
    eager: true,
    cascadeAll: true
  })
  @JoinColumn()
  googleAuth?: Authentication

  @OneToMany(type => Position, pos => pos.user, {
    cascadeInsert: true,
    cascadeUpdate: true,
    eager: true
  })
  positions: Position[]
}
