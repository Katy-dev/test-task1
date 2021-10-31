import {Directive, ElementRef, Inject, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {takeUntil} from "rxjs/operators";
import {DataValueService} from "./data-value.service";

@Directive({
  selector: '[appDragging]'
})
export class DraggingDirective implements OnInit, OnDestroy {
  stopDrag!: boolean;
  private element!: HTMLElement;
  private subscriptions: Subscription[] = [];

  constructor(private elementRef: ElementRef,
              @Inject(DOCUMENT) private document: any,
              private dataService: DataValueService) {
  }

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLElement;
    this.dataService.moveElement.subscribe(value => {
      this.stopDrag = value;
      if (this.stopDrag) this.initDrag();
    });
  }

  initDrag(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.element, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number,
      initialY: number,
      currentX = 0,
      currentY = 0;

    let dragSub: Subscription;

    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;
      this.element.classList.add('free-dragging');
      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();
        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;

        if (this.stopDrag) {
          this.element.style.transform =
            "translate3d(" + currentX + "px, " + currentY + "px, 0)";
        }
      });
    });
    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = currentX;
      initialY = currentY;
      this.element.classList.remove('free-dragging');
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
