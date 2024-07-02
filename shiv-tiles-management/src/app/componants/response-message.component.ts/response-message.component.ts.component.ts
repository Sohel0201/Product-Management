import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-response-message',
  template: `
    <div>
      {{ data.message }}
    </div>
  `,
  styles: [
    `
      div {
        color: #fff;
      }
    `,
  ],
})
export class ResponseMessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }) {}
}
