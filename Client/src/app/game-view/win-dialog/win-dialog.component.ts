import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnswerDialogComponent } from 'src/app/game-command/answer-dialog/answer-dialog.component';

@Component({
    selector: 'app-win-dialog',
    templateUrl: './win-dialog.component.html',
    styleUrls: ['./win-dialog.component.css'],
})
export class WinDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<AnswerDialogComponent>) {}

    ngOnInit() {}
}
