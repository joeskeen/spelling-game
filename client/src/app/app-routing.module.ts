import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordPreviewComponent } from './word-preview/word-preview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WordPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
