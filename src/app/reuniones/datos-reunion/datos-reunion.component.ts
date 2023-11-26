import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { ReunionesService } from '../../services/reuniones.service';
import { DatosEditarReunion } from '../../shared/interfaces/datos-editar-reunion';
import { CLOSE } from '../../shared/messages';

@Component({
  selector: 'app-datos-reunion',
  templateUrl: './datos-reunion.component.html',
  styleUrls: ['./datos-reunion.component.scss']
})
export class DatosReunionComponent implements OnInit {

  @ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;
  rutaSeleccionada: string;
  lastRoute = '';
  reunionForm: FormGroup;

  constructor(
            private router: Router,
            @Inject(MAT_DIALOG_DATA) public datosEditarReunion: DatosEditarReunion,
            private reunionService: ReunionesService,
            private snackBar: MatSnackBar,
            public dialogRef: MatDialogRef<DatosReunionComponent>,
            ) { }

  ngOnInit(): void {
    this.rutaSeleccionada = this.router.url.substring(1);
    this.rutaSeleccionada = this.rutaSeleccionada.split('/')[0];
    this.router.navigate([`/${ this.rutaSeleccionada }`, { outlets: { sidebar: 'datos-basicos-reunion' } }]);

    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet !== this.lastRoute) {
        this.lastRoute = this.rutaSeleccionada;
        this.outlet.deactivate();
      }
    });
    this.reunionService.setReunion(this.datosEditarReunion.reunion);
  }

  navega(ruta: string) {
    this.router.navigate([`/${ this.rutaSeleccionada }`, { outlets: { sidebar: ruta } }]);
  }

  async save() {
      const RESPONSE = await this.reunionService.editReunion(this.reunionService.reunion).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, reunion: this.datosEditarReunion.reunion});
        //this.reunionService.reuniones = (await this.reunionService.getAllReuniones().toPromise()).data;
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    }

  onNoClick() {
    this.dialogRef.close({reunion: this.datosEditarReunion.reunion});
  }
}
