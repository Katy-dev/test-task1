import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data = {
    "ODBottomX":750,
    "ODBottomY":290,
    "ODCenterX":750,
    "ODCenterY":210,
    "ODSize":6,
    "ODTopX":750,
    "ODTopY":200,

    "OSBottomX":250,
    "OSBottomY":290,
    "OSCenterX":250,
    "OSCenterY":210,
    "OSSize":6,
    "OSTopX":250,
    "OSTopY":200,

    "chartTypeString":"PTOSIS",
    "message_type":6,
    "timestamp":16318009174359248
  }

  constructor() { }
}
