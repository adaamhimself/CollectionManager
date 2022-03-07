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

  message: Array<Message> = []
  public warning: string;
  private messageSub: any;
  userMessage: string;

  constructor(private routing: Router, private route: ActivatedRoute, private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.messageSub = this.conversationService.getConversationList().subscribe(
      (response) => {
        this.message = response;
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  // onSubmit(): void {
  //   this.messageSub = this.conversationService.addToConversation(, ).subscribe(
  //     response => {
  //         console.log(response);
  //     }, error => {
  //         this.warning = error.error;
  //     }
  // );
  // this.routing.navigate(['/managecollections']);
  // }

  onDelete(): void {

  }
}
