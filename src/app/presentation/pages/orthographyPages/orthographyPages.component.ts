import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-orthography-pages',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './orthographyPages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrthographyPagesComponent { }
