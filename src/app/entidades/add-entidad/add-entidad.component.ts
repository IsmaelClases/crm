import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { EntidadesService } from 'src/app/services/entidades.service';
import { CLOSE, INVALID_FORM, ENTIDAD_ENTIDAD } from '../../shared/messages';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { Provincia } from 'src/app/shared/interfaces/provincia';
import { ZonasService } from 'src/app/services/zonas.service';
import { Zona } from 'src/app/shared/interfaces/zona';
import { TiposEntidadService } from 'src/app/services/tipos-entidad.service';
import { TipoEntidad } from 'src/app/shared/interfaces/tipo-entidad';
import { ContactosService } from 'src/app/services/contactos.service';
import { Contacto } from 'src/app/shared/interfaces/contacto';

@Component({
  selector: 'app-add-entidad',
  templateUrl: './add-entidad.component.html',
  styleUrls: ['./add-entidad.component.scss']
})
export class AddEntidadComponent implements OnInit {
  entidadForm: FormGroup;
  provincias: Provincia[];
  zonas: Zona[];
  tipos_entidad: TipoEntidad[];
  contactos: Contacto[];

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddEntidadComponent>,
    private snackBar: MatSnackBar,
    private servicioEntidades: EntidadesService,
    private servicioProvincia: ProvinciasService,
    private servicioZona: ZonasService,
    private servicioTipoEntidad: TiposEntidadService,
    private servicioContactos: ContactosService,

  ){ }

  ngOnInit(): void {
    this.entidadForm = new FormGroup({
      entidad: new FormControl(null, Validators.required),
      id_zona: new FormControl(null, Validators.required),
      id_contacto: new FormControl(null),
      id_tipo_entidad: new FormControl(null),
      direccion: new FormControl(null),
      cp: new FormControl(null),
      localidad: new FormControl(null),
      id_provincia: new FormControl(null),
      telefono: new FormControl(null),
      email: new FormControl(null),
      web: new FormControl(null),
      codigo: new FormControl(null),
      observaciones: new FormControl(null)

    });
    this.ENTIDAD = ENTIDAD_ENTIDAD;

    this.getProvincias();
    this.getZonas();
    this.getTiposEntidad();
    this.getDinamizadores();

  }

  async confirmAdd() {
    if (this.entidadForm.valid) {
      const modo_reunion = this.entidadForm.value as Entidad;

      const RESPONSE = await this.servicioEntidades.addEntidad(modo_reunion).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  async getProvincias(){
    const RESPONSE = await this.servicioProvincia.getAllProvincias().toPromise();
    if (RESPONSE.ok){
      this.provincias = RESPONSE.data as Provincia[];
    }
  }

  async getZonas(){
    const RESPONSE = await this.servicioZona.getAllZonas().toPromise();
    if (RESPONSE.ok){
      this.zonas = RESPONSE.data as Zona[];
    }
  }

  async getTiposEntidad(){
    const RESPONSE = await this.servicioTipoEntidad.getAllTiposEntidad().toPromise();
    if (RESPONSE.ok){
      this.tipos_entidad = RESPONSE.data as TipoEntidad[];
    }
  }

  async getDinamizadores(){
    const RESPONSE = await this.servicioContactos.getAllDinamizadores().toPromise();
    if (RESPONSE.ok){
      this.contactos = RESPONSE.data as Contacto[];
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }  
}
