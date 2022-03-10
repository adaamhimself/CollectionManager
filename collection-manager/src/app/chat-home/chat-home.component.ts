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

  term;
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


  constructor(private routing: Router, private route: ActivatedRoute, private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.messageSub = this.conversationService.getConversationList().subscribe(
      (response) => {
        this.conversations = response;
        this.messages = this.conversations[0].messages;
        this.author = this.conversations[0].username;
        this.author_id = this.conversations[0].other_participant_id;
        this.current_conversation_id = this.conversations[0]._id;
        this.loadMessages(this.conversations[0].other_participant_id);
      },
      (error) => {
        this.warning = error.error;
      }
    );

  }

  sendMessage(): void {
    this.sendsub = this.conversationService.addToConversation(this.current_conversation_id, this.reply_body).subscribe(
      (response) => {
        this.reply_body = "";
        this.loadMessages(this.current_conversation_id);
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  loadMessages(id): void {
    this.current_conversation_id = id;
    this.repliesSub = this.conversationService.getMessagesWithUser(id).subscribe(
      (response) => {
        this.replies = response.messages;
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
