import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../Message';
import { Replies } from '../Replies';
import { ConversationService } from '../conversation.service';

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
  private sendsub: any;
  private repliesSub: any;

  userMessage: string;
  messages: any;
  author: any;
  author_id: any;
  current_conversation_id: any;
  reply_body: any;
  other_participant_id: any;


  constructor(private routing: Router, private route: ActivatedRoute, private conversationService: ConversationService) { }

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
    this.sendsub = this.conversationService.addToConversation(this.current_conversation_id, this.reply_body).subscribe(
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
    this.messageSub.unsubscribe();
  }
}
