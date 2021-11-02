import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class DataValueService {
  moveElement = new BehaviorSubject<boolean>(false);

  rightValuePupil = new BehaviorSubject<number>(this.dataStorage.data.OSSize);
  leftValuePupil = new BehaviorSubject<number>(this.dataStorage.data.ODSize);

  rightTopSize = new BehaviorSubject<number>(this.dataStorage.data.OSCenterY - this.dataStorage.data.OSTopY);
  rightBottomSize = new BehaviorSubject<number>(this.dataStorage.data.OSBottomY - this.dataStorage.data.OSCenterY);
  leftTopSize = new BehaviorSubject<number>(this.dataStorage.data.ODCenterY - this.dataStorage.data.ODTopY);
  leftBottomSize = new BehaviorSubject<number>(this.dataStorage.data.ODBottomY - this.dataStorage.data.ODCenterY);


  constructor(private dataStorage: DataService) {
  }

  setRightValuePupil(value: any) {
    this.rightValuePupil.next(value);
  }

  setLeftValuePupil(value: any) {
    this.leftValuePupil.next(value);
  }

  setRightTopSize(value: any) {
    this.rightTopSize.next(value);
  }

  setRightBottomSize(value: any) {
    this.rightBottomSize.next(value);
  }

  setLeftTopSize(value: any) {
    this.leftTopSize.next(value);
  }

  setLeftBottomSize(value: any) {
    this.leftBottomSize.next(value);
  }

  getStateMoveElement(value: boolean) {
    this.moveElement.next(value);
  }
}
