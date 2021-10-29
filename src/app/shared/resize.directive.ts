import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appResize]'
})
export class ResizeDirective implements OnInit{
  width!: number;
  height!: number;
  prevY = 0;
  prevX = 0;
  grabber = false;

  constructor(private el: ElementRef) { }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

    if (!this.grabber) {
      return;
    }
    this.resizer(event.clientY - this.prevY, event.clientX - this.prevX);
    this.prevY = event.clientY;
    this.prevX = event.clientX;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.grabber = false;
  }

  resizer(offsetY: number, offsetX: number) {
    this.height += offsetY;
    this.width += offsetX;
    this.el.nativeElement.parentNode.style.height = this.height + "px";
    this.el.nativeElement.parentNode.style.width = this.width + "px";
  }

  @HostListener('mousedown', ['$event']) onResize(event: MouseEvent) {
    this.grabber = true;
    this.prevY = event.clientY;
    this.prevX = event.clientX;
    event.preventDefault();
  }

  ngOnInit() {
    this.height = parseInt(this.el.nativeElement.parentNode.offsetHeight);
    this.width = parseInt(this.el.nativeElement.parentNode.offsetWidth);
  }
}
