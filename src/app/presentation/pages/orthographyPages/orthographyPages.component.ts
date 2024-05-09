import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessagesComponent } from '../../components/chat-bubbles/chatMessages/chatMessages.component';
import { MyMessageComponent } from 'app/presentation/components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from 'app/presentation/components/typingLoader/typingLoader.component';
import { TextMessageBoxComponent } from 'app/presentation/components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from 'app/presentation/components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from 'app/presentation/components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { Message } from 'app/interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.services';
import { GptMessageOrthographyComponent } from 'app/presentation/components/chat-bubbles/gptMessageOrthography/gptMessageOrthography.component';

@Component({
  selector: 'app-orthography-pages',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessagesComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
    GptMessageOrthographyComponent
  ],
  templateUrl: './orthographyPages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPagesComponent {

  //public messages = signal<Message[]>([ { text: 'Hola Mundo', isGpt: false } ]);
  public messages = signal<Message[]>([ ]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );

  constructor(){
    
  }

  handleMessage(prompt:string){
    console.log(prompt);
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt:false,
        text:prompt
      }
    ])
    this.openAiService.checkOrtography(prompt).subscribe( resp =>{
      this.isLoading.set(false);
      //console.log(resp);
      //console.log('aqui is loading: '+this.isLoading)
      this.messages.update(prev =>[
        ...prev,
        {
          isGpt: true,
          text: resp.message,
          info: resp,
        }
      ])
    });
  }
  handleMessageWithFile( { prompt, file }: TextMessageEvent ) {
    console.log({ prompt, file });
  }
  
  handleMessageWithSelect( event: TextMessageBoxEvent ) {
    console.log(event);
  }

 }
