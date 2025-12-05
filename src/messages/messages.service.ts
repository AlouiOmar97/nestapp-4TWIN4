import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessagesService {
    //messagesRepository: MessagesRepository;
   // constructor(private readonly messagesRepository: MessagesRepository) {
    constructor(@InjectRepository(Message) private readonly messagesRepository: Repository<Message>) {
      //  this.messagesRepository = new MessagesRepository();
    }

    async findOne(id: string) {
    //return this.messagesRepository.findOne(id);
    try{
    return this.messagesRepository.findOneById(id);
    }
    catch(err){
        throw new InternalServerErrorException('Error retrieving message');
    }
    }
    async findAll() {
    //return this.messagesRepository.findAll();
    try{
        return this.messagesRepository.find();
    } catch(err){
        throw new InternalServerErrorException('Error retrieving messages');
    }
    }

    async create(content: string, status: string) {
    //return this.messagesRepository.create(content);
    
    try{
        const message = this.messagesRepository.create({content, status, date: new Date()});
        await this.messagesRepository.save(message);
        return message;
    } catch(err){
        throw new InternalServerErrorException('Error creating message');
    }
    }

    async update(id: string, msgBody: Partial<Message>) {
        try{
        const message =await this.findOne(id);
        if(!message){
            throw new NotFoundException('Message not found');
        }
        Object.assign(message, msgBody);
        await this.messagesRepository.save(message);
        return message;
    }catch(err){
        throw new InternalServerErrorException('Error updating message', err);
    }
    }

    async delete(id: string) {
    //return this.messagesRepository.delete(id);
    try{
    const message =await this.findOne(id);
    if(!message){
        throw new NotFoundException('Message not found');
    }
    
        await this.messagesRepository.remove(message);
       return message;
    }catch(err){
        throw new InternalServerErrorException('Error deleting message', err);
    }
    }
}