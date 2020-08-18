import { NgModule } from '@angular/core';
import { PhonePipe } from './pipe/phone.pipe';
@NgModule({
  imports: [],
  declarations: [PhonePipe],
  exports: [PhonePipe],
})
export class SharedModule {}
