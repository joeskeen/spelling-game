import { NgModule } from '@angular/core';
import {
  ButtonModule,
  InputModule,
  FormFieldModule,
  IconModule
} from '@healthcatalyst/cashmere';

@NgModule({
  exports: [ButtonModule, InputModule, FormFieldModule, IconModule]
})
export class CashmereModule {}
