import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.scss']
})
export class DialogAlertComponent implements OnInit {

  message = ''
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: string) { 
    this.message = data;
  }

  ngOnInit(): void {
  }

}
