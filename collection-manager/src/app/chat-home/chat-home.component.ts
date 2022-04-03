import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../Message';
import { Replies } from '../Replies';
import { ConversationService } from '../conversation.service';
import { UserService } from '../user.service';
import { UserDetails } from '../UserDetails';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {

  filteredString: string = '';
  conversations: Array<Message> = [];
  replies: Array<Replies> = [];
  public warning: string;

  // subscriptions
  private messageSub: any;
  private sendSub: any;
  private repliesSub: any;

  userMessage: string;
  messages: any;
  author: any;
  author_id: any;
  current_conversation_id: any;
  reply_body: any;
  other_participant_id: any;

  // Search Users
  public users:Array<UserDetails> = [];//currently showing
  public gridColumns = 4;

  public messageTitle = "";
  public message = "";
  public query = "";  
  public userCount = 0;
  private userSub: any = null;


  constructor(private routing: Router, private route: ActivatedRoute, private conversationService: ConversationService, private userService:UserService) { }

  ngOnInit(): void {
    this.messageSub = this.conversationService.getConversationList().subscribe(
      (response) => {
        console.log(this.conversations);
        this.conversations = response;
        this.author = this.conversations[0].username;
        this.author_id = this.conversations[0].other_participant_id;
        this.current_conversation_id = this.conversations[0]._id;
        this.other_participant_id = this.conversations[0].other_participant_id;
        this.loadMessages(this.conversations[0]._id, this.author, this.other_participant_id);
      },
      (error) => {
        this.warning = error.error;
        console.log(error);
      }
    );

  }

  sendMessage(): void {
    this.sendSub = this.conversationService.addToConversation(this.current_conversation_id, this.reply_body).subscribe(
      (response) => {
        this.reply_body = "";
        console.log(this.current_conversation_id, this.reply_body);
        this.loadMessages(this.current_conversation_id, this.author, this.other_participant_id);
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }
  //update the shown users using the search query
  search(): void {
    if (this.query.length == 0){
        this.messageTitle = "Search Users"
        this.message = "Please provide a query before searching";
        return;
      }
    this.messageTitle = "Searching..."
    this.message = "Users that fit your query will appear below";
    //get all users that fit the query
    this.userSub = this.userService.findUser(this.query).subscribe(
        (response) => {
            this.users = response;
            //update the count
            this.userCount = this.users.length;
            //update the message depending on whether there were any returned users
            if (this.userCount == 0){
                this.messageTitle = "No Users";
                this.message = "No users fit that search query. Check spelling or try a simpler query."
            } else {
                this.messageTitle = "Search Users";
                this.message = "Users that fit your query will appear below";
            }
        },
        (error) => {
            this.warning = error.error;
            //update message when there's an error (back to default)
            this.messageTitle = "Search Users";
            this.message = "Users that fit your query will appear below";
        }
    );
  }

  createConversation(id, message): void {
    this.sendSub = this.conversationService.createConversation(id, message).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  loadMessages(id, username, other_participant): void {
    this.current_conversation_id = id;
    this.other_participant_id = other_participant;
    this.author = username;
    this.repliesSub = this.conversationService.getMessagesWithUser(this.other_participant_id).subscribe(
      (response) => {
        this.replies = response.messages;
        console.log(this.replies);
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  onDelete(): void {
    this.messageSub = this.conversationService.deleteConversation(this.current_conversation_id).subscribe(
      (response) => {
          console.log(response);
          console.log("successfully deleted conversation");
          window.location.reload();//reload the page
      },
      (error) => {
          console.log("failed deleting conversation");
          this.warning = error.error;
      }
  );
  }

  //unsubscribe upon being destroyed
  ngOnDestroy() {
    if (this.messageSub) this.messageSub.unsubscribe();
    if (this.sendSub) this.sendSub.unsubscribe();
    if (this.repliesSub) this.repliesSub.unsubscribe();
  }
}
