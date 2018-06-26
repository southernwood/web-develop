import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {Subject} from "rxjs/Subject";

import {TableService} from "./table.service";
import {TableModel} from "./table-model";
import {dateFormat} from "../shared/utilities"
import {AF} from "../shared/af";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit, OnDestroy{
  tables: TableModel[];
  momentVariable = new Date();
  subscription: Subscription;
  timeChange = new Subject<Date>();

  constructor(
    private tableService: TableService,
    private af: AF
  ) {}

  ngOnInit() {
    this.subscription = this.tableService.tablesChanged.subscribe(
      (tables: TableModel[]) =>{
        this.tables = tables;
      }
    )
    this.tables = this.tableService.getTables();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onChange(){
    this.timeChange.next(this.momentVariable);
  }
  goTo(location: string): void {
    window.location.hash = location;
  }

}
