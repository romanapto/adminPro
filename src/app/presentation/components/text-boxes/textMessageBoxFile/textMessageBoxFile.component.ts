import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TextMessageEvent {
  file: File;
  prompt?: string | null;
}

@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './textMessageBoxFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {
  @Input() placeholder: string = '';
  @Input() disableCorrections: boolean = false;

  @Output() onMessage = new EventEmitter<TextMessageEvent>();


  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [] ,
    file: [null, Validators.required ]
  });

  handleSelectedFile( event: any ) {
    const file = event.target.files.item(0);
    this.form.controls.file.setValue(file);

  }


  handleSubmit() {
    if ( this.form.invalid ) return;

    const { prompt, file } = this.form.value;
    //console.log({prompt});

    this.onMessage.emit({ prompt, file: file! });
    this.form.reset();

  }
 }
