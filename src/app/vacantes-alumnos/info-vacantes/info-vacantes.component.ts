import { Component, Inject, OnInit, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InfoVacantes } from 'src/app/shared/interfaces/info-vacantes';

@Component({
  selector: 'app-info-vacantes',
  templateUrl: './info-vacantes.component.html',
  styleUrls: ['./info-vacantes.component.scss']
})
export class InfoVacantesComponent implements OnInit {
  constructor(
    public MatDialogRef: MatDialogRef<InfoVacantesComponent>,
    @Inject(MAT_DIALOG_DATA) public infoVacantes: InfoVacantes[]
  ) { }

  ngOnInit(): void {
    console.log(this.infoVacantes)
  }

  onNoClick() {
    this.MatDialogRef.close({ ok: false });
  }
}
