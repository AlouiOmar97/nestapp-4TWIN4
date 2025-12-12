import { MessagesMongoService } from './messages-mongo/messages-mongo.service';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
import { UpdateMessageDTO } from './dtos/update-message.dto';
import { Serialize, SerializerInterceptor } from 'src/interceptors/serializer.interceptor';

//@UseInterceptors(ClassSerializerInterceptor)
//@UseInterceptors(SerializerInterceptor)
@Controller('messages')
export class MessagesController {
    //messagesService: MessagesService;
    constructor(private readonly messagesService: MessagesService,
                private readonly messagesMongoService: MessagesMongoService
    ) {
       // this.messagesService = new MessagesService();
    }
    @Get()
    listMessages() {
        console.log("Message List");
        //return "List of Messages";
        return this.messagesService.findAll();
    }

    @Get('/seen')
    async getSeenMessages() {
        console.log("Get Seen Messages");
        return await this.messagesMongoService.getAllSeenMessages();
    }

    @Get('/summaries')
    async getMessageSummaries() {
        console.log("Get Message Summaries");
        return await this.messagesMongoService.getMessageSummaries();
    }

    @Get('/recent-seen/:date')
    async getRecentSeenMessages(@Param('date') dateStr: string) {
        console.log("Get Recent Seen Messages since: " + dateStr);
        const date = new Date(dateStr);
        return await this.messagesMongoService.getRecentSeenMessages(date);
    }

    @Get('/paginated/:skip/:take')
    async getPaginatedMessages(@Param('skip') skipStr: string, @Param('take') takeStr: string) {
        const skip = parseInt(skipStr, 10);
        const take = parseInt(takeStr, 10);
        console.log(`Get Paginated Messages - Skip: ${skip}, Take: ${take}`);
        return await this.messagesMongoService.getPaginatedMessages(skip, take);
    }
    
    @Get('/count/seen/:status')
    async countSeenMessages(@Param('status') status: string = "seen") {
        console.log("Count Seen Messages");
        const [messages, count] = await this.messagesMongoService.countSeenMessages(status);
        return { messages, count };
    }

    @Get('/count-by-status')
    async countMessagesByStatus() {
        console.log("Count Messages By Status");
        return await this.messagesMongoService.countMessagesByStatus();
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
    @Serialize(CreateMessageDTO)
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
