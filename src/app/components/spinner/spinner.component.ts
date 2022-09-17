import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA } from '../../services/dialog/dialog-tokens';
import { DialogRef } from '../../services/dialog/dialog-ref';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  constructor(@Inject(DIALOG_DATA) public data: string) {}

  ngOnInit(): void {}
}
