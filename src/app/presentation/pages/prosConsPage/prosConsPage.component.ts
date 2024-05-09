import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from 'app/interfaces/message.interface';
import { ChatMessagesComponent } from 'app/presentation/components/chat-bubbles/chatMessages/chatMessages.component';
import { MyMessageComponent } from 'app/presentation/components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from 'app/presentation/components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from 'app/presentation/components/typingLoader/typingLoader.component';
import { OpenAiService } from 'app/presentation/services/openai.services';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  //public messages = signal<Message[]>([ { text: 'Hola Mundo', isGpt: false } ]);
  public messages = signal<Message[]>([ ]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );

  constructor(){
    
  }

  handleMessage(prompt:string){
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt:false,
        text:prompt
      }
    ])
    this.openAiService.prosConsDiscusser(prompt).subscribe( resp =>{
      this.isLoading.set(false);
      this.messages.update(prev =>[
        ...prev,
        {
          isGpt: true,
          text: resp.content,
          
        }
      ])
    })
  }
 }
