import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashmereModule } from './cashmere.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [CommonModule, FormsModule, CashmereModule]
})
export class SharedModule {}
