import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from 'app/interfaces/message.interface';
import { ChatMessagesComponent } from 'app/presentation/components/chat-bubbles/chatMessages/chatMessages.component';
import { MyMessageComponent } from 'app/presentation/components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from 'app/presentation/components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent } from 'app/presentation/components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxSelectComponent } from 'app/presentation/components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from 'app/presentation/components/typingLoader/typingLoader.component';
import { OpenAiService } from 'app/presentation/services/openai.services';

@Component({
  selector: 'app-pros-cons-stream-page',
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
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {

  public messages = signal<Message[]>([ ]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );

  async handleMessage(prompt:any){
    await this.openAiService.prosConsStreamDiscusser(prompt);
  }
 }
