import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { CLOSE } from '../../shared/messages';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';

@Component({
  selector: 'app-datos-unidad-centro',
  templateUrl: './datos-unidad-centro.component.html',
  styleUrls: ['./datos-unidad-centro.component.scss']
})
export class DatosUnidadCentroComponent implements OnInit {

  @ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;
  rutaSeleccionada: string;
  lastRoute = '';
  unidadCentroForm: FormGroup;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public datosEditarUnidadCentro: UnidadesCentro,
    private unidadesCentroService: UnidadesCentroService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DatosUnidadCentroComponent>,
  ) { }

  ngOnInit(): void {
    this.rutaSeleccionada = this.router.url.substring(1);
    this.rutaSeleccionada = this.rutaSeleccionada.split('/')[0];
    this.router.navigate([`/${this.rutaSeleccionada}`, { outlets: { sidebar: 'datos-basicos-unidad-centro' } }]);

    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet !== this.lastRoute) {
        this.lastRoute = this.rutaSeleccionada;
        this.outlet.deactivate();
      }
    });
    this.unidadesCentroService.setUnidadCentro(this.datosEditarUnidadCentro)
  }

  navega(ruta: string) {
    this.router.navigate([`/${this.rutaSeleccionada}`, { outlets: { sidebar: ruta } }]);
  }

  async save() {
    const RESPONSE = await this.unidadesCentroService.editUnidadesCentro(this.unidadesCentroService.unidadCentro).toPromise();
    if (RESPONSE.ok){
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ok: RESPONSE.ok, unidadCentro: this.datosEditarUnidadCentro})
    } else {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({unidadCentro: this.datosEditarUnidadCentro});
  }
}
