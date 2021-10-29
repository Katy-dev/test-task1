import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, AfterViewChecked {
  isOnMode: boolean = true;
  height!: string;
  width!: string;
  resize: boolean = false;

  data: any;
  leftBottomX?: string;
  leftBottomY?: string;
  leftTopX?: string;
  leftTopY?: string;
  leftCenterX?: string;
  leftCenterY?: string;
  leftCenterCircleX?: string;
  leftCenterCircleY?: string;
  rightBottomX?: string;
  rightBottomY?: string;
  rightTopX?: string;
  rightTopY?: string;
  rightCenterX?: string;
  rightCenterY?: string;
  rightCenterCircleX?: string;
  rightCenterCircleY?: string;
  positionCircle = 10;

  rightTopLine!: any;
  rightCenterLine!: any;
  rightBottomLine!: any;

  leftTopLine!: any;
  leftCenterLine!: any;
  leftBottomLine!: any;
  rightRangeLine!: any;
  leftRangeLine!: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.data = this.dataService.data;
    let elem: any = document.getElementById('photo');
    let coords: any = elem.getBoundingClientRect();
    this.leftBottomX = this.data.ODBottomX + coords.x + 'px';
    this.leftBottomY = this.data.ODBottomY + coords.y + 'px';
    this.leftCenterX = this.data.ODCenterX + coords.x + 'px';
    this.leftCenterY = this.data.ODCenterY + coords.y + 'px';
    this.leftTopX = this.data.ODTopX + coords.x + 'px';
    this.leftTopY = this.data.ODTopY + coords.y + 'px';
    this.leftCenterCircleX = this.data.ODCenterX + coords.x - this.positionCircle + 'px';
    this.leftCenterCircleY = this.data.ODCenterY + coords.x - this.positionCircle + 'px';

    this.rightBottomX = this.data.OSBottomX + coords.x + 'px';
    this.rightBottomY = this.data.OSBottomY + coords.y + 'px';
    this.rightCenterX = this.data.OSCenterX + coords.x + 'px';
    this.rightCenterY = this.data.OSCenterY + coords.y + 'px';
    this.rightTopX = this.data.OSTopX + coords.x + 'px';
    this.rightTopY = this.data.OSTopY + coords.y + 'px';
    this.rightCenterCircleX = this.data.OSCenterX + coords.y - this.positionCircle + 'px';
    this.rightCenterCircleY = this.data.OSCenterY + coords.y - this.positionCircle + 'px';
  }

  onEdit() {
    this.isOnMode = !this.isOnMode;
  }

  ngAfterViewChecked() {
    this.rightTopLine = document.querySelector('.right-range-line-top');
    this.rightCenterLine = document.querySelector('.right-range-line-center');
    this.rightBottomLine = document.querySelector('.right-range-line-bottom');
    this.leftTopLine = document.querySelector('.left-range-line-top');
    this.leftCenterLine = document.querySelector('.left-range-line-center');
    this.leftBottomLine = document.querySelector('.left-range-line-bottom');
    this.rightRangeLine = document.querySelector(".right-vertical-line");
    this.leftRangeLine = document.querySelector(".left-vertical-line");
    this.onMove();
  }

  onMove() {
    let rightRangeCoords = this.getCoordinates(this.rightRangeLine);
    let leftRangeCoords = this.getCoordinates(this.leftRangeLine);
  }

  getCoordinates(elem: any) {
    let box = elem.getBoundingClientRect();

    return {
      left: box.left + pageXOffset,
    };
  }

}
