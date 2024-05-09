import { Injectable } from '@angular/core';
import { ortography } from 'app/core/use-cases/ortography/ortography.use-case';
import { prosConsStreamUseCase } from 'app/core/use-cases/pros-cons/pros-cons-stream.use-case';
import { prosConsUseCase } from 'app/core/use-cases/pros-cons/pros-cons.use-case';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    
    checkOrtography(prompt:string){
        return from (ortography(prompt));
    }

    prosConsDiscusser( prompt: string ) {
        return from( prosConsUseCase(prompt) );
    }
    
    prosConsStreamDiscusser( prompt: string ) {
        return prosConsStreamUseCase(prompt);
    }
}