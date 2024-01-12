// Importaciones necesarias
import { Component, OnInit, Inject } from '@angular/core';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE } from '../../shared/messages';

@Component({
  selector: 'app-delete-unidades-centro',
  templateUrl: './delete-unidades-centro.component.html',
  styleUrls: ['./delete-unidades-centro.component.scss']
})
export class DeleteUnidadesCentroComponent implements OnInit {

  // Constructor con inyección de dependencias
  constructor(
    public dialogRef: MatDialogRef<DeleteUnidadesCentroComponent>,
    @Inject(MAT_DIALOG_DATA) public unidadesCentro: UnidadesCentro, // Datos de unidadesCentro a eliminar
    public unidadesCentroService: UnidadesCentroService, // Servicio para realizar operaciones con unidadesCentro
    private snackBar: MatSnackBar // Servicio para mostrar mensajes emergentes (snackbar)
  ) { }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void { }

  // Método que se ejecuta al hacer clic en el botón de "Cancelar"
  onNoClick(): void {
    this.dialogRef.close({ ok: false }); // Cierra el diálogo sin realizar ninguna acción
  }

  // Método que se ejecuta al confirmar la eliminación de la unidadCentro
  async confirmDelete() {
    const RESPONSE = await this.unidadesCentroService.deleteUnidadesCentro(this.unidadesCentro.id_unidad_centro).toPromise();
    // Realiza la solicitud al servicio para eliminar la unidadCentro

    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      // Muestra un mensaje de éxito usando el servicio de snackbar
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      // Cierra el diálogo y devuelve la información de la respuesta
    } else {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      // Muestra un mensaje de error usando el servicio de snackbar en caso de fallo
    }
  }
}
