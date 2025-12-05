import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
import { UpdateMessageDTO } from './dtos/update-message.dto';

@Controller('messages')
export class MessagesController {
    //messagesService: MessagesService;
    constructor(private readonly messagesService: MessagesService) {
       // this.messagesService = new MessagesService();
    }
    @Get()
    listMessages() {
        console.log("Message List");
        //return "List of Messages";
        return this.messagesService.findAll();
    }
    @Get('/:id')
    async getMessageById(@Param('id') id: string) {
        console.log("Get Message by ID: "+ id);
        //return "Message Details: " + id;
        const message =await this.messagesService.findOne(id);
        console.log(message);
        
        if (!message) {
            console.log("Message not found");
            throw new NotFoundException('Message not found !!!');
        }
        return message;
    }
    @Post()
    createMessage(@Body() body: CreateMessageDTO) {
        console.log("Create Message");
        console.log(body.content);
        //return body;
        return this.messagesService.create(body.content, body.status);
    }

    @Put('/:id')
    updateMessage(@Param('id') id: string,  @Body() body: UpdateMessageDTO) {
        console.log("Update Message with ID: " + id);
        console.log(body);
        return this.messagesService.update(id, body);
    }

    @Delete('/:id')
    deleteMessage(@Param('id') id: string) {
        console.log("Delete Message with ID: " + id);
        //return "Delete Message with ID: " + id;
        return this.messagesService.delete(id);
    }
}
