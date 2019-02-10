import { Component, OnInit } from '@angular/core';
import { DeskResourceService, Store, Desk } from 'shared';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.scss']
})
export class DeskComponent implements OnInit {
  desk: Desk = {};
  desks: Array<Desk> = [];
  store: Store = {id: 1};

  constructor(private deskResourceService: DeskResourceService) {
    this.getAll();
  }

  ngOnInit() {
  }
  getAll() {
    this.deskResourceService.getAllDesksUsingGET().subscribe(res => {
      this.desks = res;
    });
  }
  add () {
    this.desk = {name: ''};
  }
  edit(item) {
    this.desk = item;
  }
  delete() {
    this.deskResourceService.deleteDeskUsingDELETE(this.desk.id).subscribe(res => {
      console.log('删除成功');
      this.getAll();
    });
  }
  save() {
    const desk = this.desk;
    if (desk.id > 0) {
      this.deskResourceService.updateDeskUsingPUT(desk).subscribe(res => {
        console.log(res);

    this.getAll();
      });
    } else {
      this.deskResourceService.createDeskUsingPOST(desk).subscribe(res => {
        console.log(res);

    this.getAll();
      });
    }
  }

}
