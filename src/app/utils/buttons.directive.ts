import { Directive, HostListener, HostBinding } from '@angular/core';
@Directive({
  selector: '[appButtons]'
})
export class ButtonDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen
  }
}