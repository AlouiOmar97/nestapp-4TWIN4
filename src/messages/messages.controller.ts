import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    messagesService: MessagesService;
    constructor() {
        this.messagesService = new MessagesService();
    }
    @Get()
    listMessages() {
        console.log("Message List");
        //return "List of Messages";
        return this.messagesService.findAll();
    }
    @Get('/:id')
    getMessageById(@Param('id') id: string) {
        console.log("Get Message by ID: "+ id);
        //return "Message Details: " + id;
        return this.messagesService.findOne(id);
    }
    @Post()
    createMessage(@Body() body: CreateMessageDTO) {
        console.log("Create Message");
        console.log(body.content);
        //return body;
        return this.messagesService.create(body.content);
    }

    @Delete('/:id')
    deleteMessage(@Param('id') id: string) {
        console.log("Delete Message with ID: " + id);
        //return "Delete Message with ID: " + id;
        return this.messagesService.delete(id);
    }
}
