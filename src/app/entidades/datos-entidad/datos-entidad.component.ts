import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { EntidadesService } from '../../services/entidades.service';
import { DatosEditarEntidad } from '../../shared/interfaces/datos-editar-entidad';
import { CLOSE } from '../../shared/messages';


@Component({
  selector: 'app-datos-entidad',
  templateUrl: './datos-entidad.component.html',
  styleUrls: ['./datos-entidad.component.scss']
})
export class DatosEntidadComponent implements OnInit {

  @ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;
  rutaSeleccionada: string;
  lastRoute = '';
  entidadForm: FormGroup;

  constructor(
            private router: Router,
            @Inject(MAT_DIALOG_DATA) public datosEditarEntidad: DatosEditarEntidad,
            private entidadService: EntidadesService,
            private snackBar: MatSnackBar,
            public dialogRef: MatDialogRef<DatosEntidadComponent>,
            ) { }

  ngOnInit(): void {
    this.rutaSeleccionada = this.router.url.substring(1);
    this.rutaSeleccionada = this.rutaSeleccionada.split('/')[0];
    this.router.navigate([`/${ this.rutaSeleccionada }`, { outlets: { sidebar: 'datos-basicos-entidad' } }]);

    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet !== this.lastRoute) {
        this.lastRoute = this.rutaSeleccionada;
        this.outlet.deactivate();
      }
    });
    this.entidadService.setEntidad(this.datosEditarEntidad.entidad);
  }

  navega(ruta: string) {
    this.router.navigate([`/${ this.rutaSeleccionada }`, { outlets: { sidebar: ruta } }]);
  }

  async save() {
      const RESPONSE = await this.entidadService.editEntidad(this.entidadService.entidad).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, entidad: this.datosEditarEntidad.entidad});
        //this.entidadService.entidades = (await this.entidadService.getAllEntidades().toPromise()).data;
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    }

  onNoClick() {
    this.dialogRef.close({entidad: this.datosEditarEntidad.entidad});
  }
}
