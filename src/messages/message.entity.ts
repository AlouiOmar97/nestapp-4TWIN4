import { Exclude } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { Entity, ObjectIdColumn, ObjectId, Column, AfterInsert, AfterUpdate, AfterRemove, BeforeInsert } from 'typeorm';

@Entity()
export class Message {
    
@ObjectIdColumn()
@Exclude()
id: ObjectId;
@Column()
@IsString()
content: string;
@Column()
@IsString()
@Exclude()
status: string;
@Column()
@IsDate()
date: Date;

@BeforeInsert()
setDate() {
    this.date = new Date();
}
@AfterInsert()
logInsert() {
    console.log(`Message inserted with id: ${this.id}`);
}
@AfterUpdate()
logUpdate() {
    console.log(`Message updated with id: ${this.id}`);
}
@AfterRemove()
logRemove() {
    console.log(`Message removed with id: ${this.id}`);
}
}