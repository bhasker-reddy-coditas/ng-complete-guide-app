import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.show') isOpen = false; 

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
    const hostElement = this.elRef.nativeElement.querySelector('.dropdown-menu');
  }
  constructor(private elRef : ElementRef,private renderer : Renderer2) { 
   
  }

}
