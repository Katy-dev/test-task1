import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";
import {DataValueService} from "../shared/data-value.service";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isOnMode: boolean = false;
  height!: string;
  width!: string;
  resize: boolean = false;
  rightPupil!: any;
  leftPupil!: any;
  stopMoveElement: boolean = false;
  topRightSize!: any;
  bottomRightSize!: any;
  topLeftSize!: any;
  bottomLeftSize!: any;
  heightRightTopArrow!: string;
  heightRightBottomArrow!: string;
  heightLeftTopArrow!: string;
  heightLeftBottomArrow!: string;
  eyes!: string;
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
  saveChanges: boolean = false;
  lens: number = 1;

  constructor(private dataService: DataService, private dataValueService: DataValueService) {
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
    this.leftCenterCircleY = this.data.ODCenterY + coords.y - this.positionCircle + 'px';

    this.rightBottomX = this.data.OSBottomX + coords.x + 'px';
    this.rightBottomY = this.data.OSBottomY + coords.y + 'px';
    this.rightCenterX = this.data.OSCenterX + coords.x + 'px';
    this.rightCenterY = this.data.OSCenterY + coords.y + 'px';
    this.rightTopX = this.data.OSTopX + coords.x + 'px';
    this.rightTopY = this.data.OSTopY + coords.y + 'px';
    this.rightCenterCircleX = this.data.OSCenterX + coords.x - this.positionCircle + 'px';
    this.rightCenterCircleY = this.data.OSCenterY + coords.y - this.positionCircle + 'px';

    this.dataValueService.rightValuePupil.subscribe((num) => {
      this.rightPupil = this.calculateValue(num);
    });

    this.dataValueService.leftValuePupil.subscribe((num) => {
      this.leftPupil = this.calculateValue(num);
    });

    this.dataValueService.rightTopSize.subscribe((num) => {
      this.heightRightTopArrow = num + 'px';
      this.topRightSize = this.calculateValue(num);
    });
    this.dataValueService.rightBottomSize.subscribe((num) => {
      this.heightRightBottomArrow = num + 'px';
      this.bottomRightSize = this.calculateValue(num);
    });
    this.dataValueService.leftTopSize.subscribe((num) => {
      this.heightLeftTopArrow = num + 'px';
      this.topLeftSize = this.calculateValue(num);
    });
    this.dataValueService.leftBottomSize.subscribe((num) => {
      this.heightLeftBottomArrow = num + 'px';
      this.bottomLeftSize = this.calculateValue(num);
    });
  }

  onEdit() {
    this.isOnMode = !this.isOnMode;
    this.saveChanges = false;
  }

  onMove() {
    this.stopMoveElement = !this.stopMoveElement;
    this.dataValueService.getStateMoveElement(this.stopMoveElement);
  }

  calculateValue(valuePx: number) {
    let valueMM;
    if (this.lens > 0) {
      let perc = 0.0232;
      valueMM = (valuePx / 14.5) - (valuePx / 14.5) * perc * this.lens;
      valueMM = valueMM.toFixed(1) + ' mm';
    }

    if (this.lens < 0) {
      let perc = 0.0178;
      valueMM = (valuePx / 14.5) - (valuePx / 14.5) * perc * this.lens;
      valueMM = valueMM.toFixed(1) + ' mm';
    }
    return valueMM;
  }

}
