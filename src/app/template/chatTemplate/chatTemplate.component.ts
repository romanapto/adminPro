import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from 'app/interfaces/message.interface';
import { ChatMessagesComponent } from 'app/presentation/components/chat-bubbles/chatMessages/chatMessages.component';
import { MyMessageComponent } from 'app/presentation/components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from 'app/presentation/components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from 'app/presentation/components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from 'app/presentation/components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from 'app/presentation/components/typingLoader/typingLoader.component';
import { OpenAiService } from '../../presentation/services/openai.services';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent { 
  public messages = signal<Message[]>([ { text: 'Hola Mundo', isGpt: false } ]);
  public isLoading = false;
  public openAiService = inject( OpenAiService );

  handleMessage(prompt:string){
    console.log(prompt)
  }
  handleMessageWithFile( { prompt, file }: TextMessageEvent ) {
    console.log({ prompt, file });
  }
  
  handleMessageWithSelect( event: TextMessageBoxEvent ) {
    console.log(event);
  }
}
