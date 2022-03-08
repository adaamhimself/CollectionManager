import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../Message';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {

  conversations: Array<Message> = [];
  public warning: string;
  private messageSub: any;
  userMessage: string;
  messages: any;
  author: any;
  author_id: any;


  constructor(private routing: Router, private route: ActivatedRoute, private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.messageSub = this.conversationService.getConversationList().subscribe(
      (response) => {
        this.conversations = response;
        this.messages = this.conversations[0].messages;
        this.author = this.conversations[0].username;
        this.author_id = this.conversations[0].other_participant_id;
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
