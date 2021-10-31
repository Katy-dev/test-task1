import {Directive, ElementRef, Inject, Input, OnInit} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {takeUntil} from "rxjs/operators";
import {DataValueService} from "./data-value.service";

@Directive({
  selector: '[appDragLine]'
})
export class DragLineDirective implements OnInit {
  @Input() eyes!: string;
  @Input() save!: boolean;

  rightCenterLine!: any;
  leftCenterLine!: any;
  leftCenterCoords!: any;
  rightCenterCoords!: any;
  leftMaxCordsBottom!: any;
  leftMaxCordsTop!: any;
  rightMaxCordsTop!: any;
  rightMaxCordsBottom!: any;
  heightLine: number = 150;


  private element!: HTMLElement;
  private subscriptions: Subscription[] = [];

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: any, private dataService: DataValueService) {
  }

  ngOnInit(): void {
    this.rightCenterLine = document.querySelector('.right-range-line-center');
    this.leftCenterLine = document.querySelector('.left-range-line-center');
    this.leftCenterCoords = this.getCoordinates(this.leftCenterLine);
    this.rightCenterCoords = this.getCoordinates(this.rightCenterLine);

    this.rightMaxCordsBottom = this.rightCenterCoords + this.heightLine;
    this.leftMaxCordsBottom = this.rightCenterCoords + this.heightLine;
    this.rightMaxCordsTop = this.rightCenterCoords - this.heightLine;
    this.leftMaxCordsTop = this.rightCenterCoords - this.heightLine;

    this.element = this.elementRef.nativeElement as HTMLElement;
    this.initDragLine();
  }

  getCoordinates(elem: any) {
    let line = elem.getBoundingClientRect();
    return line.top;
  }

  initDragLine(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.element, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    let initialY: number,
      currentY = 0;

    let dragSub: Subscription;

    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {

      initialY = event.clientY - currentY;
      this.element.classList.add('line-dragging');
      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        currentY = event.clientY - initialY;

        if (currentY) {
          if (this.element.classList.contains('left-range-line-bottom')) {
            if (this.leftCenterCoords <= event.clientY) {
              this.element.style.transform = "translateY(" + currentY + "px)";
            }
            if (event.clientY <= this.leftMaxCordsBottom) {
              this.element.style.transform = "translateY(" + currentY + "px)";
            }
            if (this.eyes === 'leftBottom') {
              this.dataService.setLeftBottomSize(event.clientY - this.leftCenterCoords);
            }
            localStorage.setItem('ODBottomX', JSON.stringify(event.clientX));
            localStorage.setItem('ODBottomY', JSON.stringify(event.clientY));
          }
        }
        if (currentY) {
          if (this.element.classList.contains('left-range-line-top')) {
            if (this.leftCenterCoords >= event.clientY) {
              this.element.style.transform = "translateY(" + currentY + "px)";
            }
            if (event.clientY >= this.leftMaxCordsTop) {
              this.element.style.transform = "translateY(" + currentY + "px)";
            }
            if (this.eyes === 'leftTop') {
              this.dataService.setLeftTopSize(event.clientY - this.leftCenterCoords);
            }
            localStorage.setItem('ODTopX', JSON.stringify(event.clientX));
            localStorage.setItem('ODTopY', JSON.stringify(event.clientY));
          }
        }
        if (currentY) {
          if (this.element.classList.contains('right-range-line-bottom')) {
            if (this.rightCenterCoords >= event.clientY) {
              this.element.style.transform = "translateY(" + currentY + "px)";
            }
            if (event.clientY <= this.rightMaxCordsBottom) {
              this.element.style.transform = "translateY(" + currentY + "px)";
            }
            if (this.eyes === 'rightBottom') {
              this.dataService.setRightBottomSize(event.clientY - this.rightCenterCoords);
            }
            localStorage.setItem('OSBottomX', JSON.stringify(event.clientX));
            localStorage.setItem('OSBottomY', JSON.stringify(event.clientY));
          }
        }
        if (currentY) {
          if (this.element.classList.contains('right-range-line-top')) {
            if (this.rightCenterCoords >= event.clientY) {
              this.element.style.transform = "translateY(" + currentY + "px)";
            }
            if (event.clientY >= this.rightMaxCordsTop) {
              this.element.style.transform = "translateY(" + currentY + "px)";
            }
            if (this.eyes === 'rightTop') {
              this.dataService.setRightTopSize(event.clientY - this.rightCenterCoords);
            }
            localStorage.setItem('OSTopX', JSON.stringify(event.clientX));
            localStorage.setItem('OSTopY', JSON.stringify(event.clientY));
          }
        }
        let right = this.rightCenterLine.getBoundingClientRect();
        let left = this.leftCenterLine.getBoundingClientRect();
        localStorage.setItem('ODCenterX', JSON.stringify(right.x));
        localStorage.setItem('ODCenterY', JSON.stringify(right.y));
        localStorage.setItem('OSCenterX', JSON.stringify(left.x));
        localStorage.setItem('OSCenterY', JSON.stringify(left.y));
        if (this.save) {
          localStorage.setItem('save', JSON.stringify(true));
        }
      });
    });
    const dragEndSub = dragEnd$.subscribe(() => {
      initialY = currentY;

      this.element.classList.remove('line-dragging');
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragSub!,
      dragEndSub,
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }

}
