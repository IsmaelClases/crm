import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntidadesService } from 'src/app/services/entidades.service';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { CLOSE, ENTIDAD_ENTIDAD, ERROR } from '../../shared/messages';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { Provincia } from 'src/app/shared/interfaces/provincia';
import { ZonasService } from 'src/app/services/zonas.service';
import { Zona } from 'src/app/shared/interfaces/zona';
import { TiposEntidadService } from 'src/app/services/tipos-entidad.service';
import { TipoEntidad } from 'src/app/shared/interfaces/tipo-entidad';
import { ContactosService } from 'src/app/services/contactos.service';
import { Contacto } from 'src/app/shared/interfaces/contacto';

@Component({
  selector: 'app-edit-entidad',
  templateUrl: './edit-entidad.component.html',
  styleUrls: ['./edit-entidad.component.scss']
})
export class EditEntidadComponent implements OnInit {

  entidadForm: FormGroup;
  entidades: Entidad[];
  provincias: Provincia[];
  zonas: Zona[];
  tipos_entidad: TipoEntidad[];
  contactos: Contacto[];

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditEntidadComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public entidad: Entidad,
    private servicioProvincia: ProvinciasService,
    private servicioZona: ZonasService,
    private servicioEntidad: EntidadesService,
    private servicioTipoEntidad: TiposEntidadService,
    private servicioContactos: ContactosService,

  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_ENTIDAD;
    this.entidadForm = new FormGroup({
      id_entidad: new FormControl(this.entidad.id_entidad, Validators.required),
      entidad: new FormControl(this.entidad.entidad, Validators.required),
      id_zona: new FormControl(this.entidad.id_zona, Validators.required),
      id_contacto: new FormControl(this.entidad.id_contacto),
      id_tipo_entidad: new FormControl(this.entidad.id_tipo_entidad),
      direccion: new FormControl(this.entidad.direccion),
      cp: new FormControl(this.entidad.cp),
      localidad: new FormControl(this.entidad.localidad),
      id_provincia: new FormControl(this.entidad.id_provincia),
      telefono: new FormControl(this.entidad.telefono),
      email: new FormControl(this.entidad.email),
      web: new FormControl(this.entidad.web),
      codigo: new FormControl(this.entidad.codigo),
      observaciones: new FormControl(this.entidad.observaciones)
    });

    this.getProvincias();
    this.getZonas();
    this.getTiposEntidad();
    this.getDinamizadores();

  }

  async confirmEdit(){
    if (this.entidadForm.valid) {
      const entidadForm = this.entidadForm.value;

      const RESPONSE = await this.servicioEntidad.editEntidad(entidadForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
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
    this.dialogRef.close({ ok: false });
  }
}
