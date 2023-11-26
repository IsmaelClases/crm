import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reunion } from 'src/app/shared/interfaces/reunion';
import { ReunionesService } from 'src/app/services/reuniones.service';
import { CLOSE, INVALID_FORM, ENTIDAD_REUNION } from '../../shared/messages';
import { ZonasService } from 'src/app/services/zonas.service';
import { Zona } from 'src/app/shared/interfaces/zona';
import { MotivosReunionService } from 'src/app/services/motivos-reunion.service';
import { MotivoReunion } from 'src/app/shared/interfaces/motivo-reunion';
import { ModosReunionService } from 'src/app/services/modos-reunion.service';
import { ModoReunion } from 'src/app/shared/interfaces/modo-reunion';
import { EntidadesService } from 'src/app/services/entidades.service';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { ContactosService } from 'src/app/services/contactos.service';
import { Contacto } from 'src/app/shared/interfaces/contacto';

@Component({
  selector: 'app-add-reunion',
  templateUrl: './add-reunion.component.html',
  styleUrls: ['./add-reunion.component.scss']
})
export class AddReunionComponent implements OnInit {
  reunionForm: FormGroup;
  zonas: Zona[];
  modos_reunion: ModoReunion[];
  motivos_reunion: MotivoReunion[];
  entidades_target: Entidad[];
  contactos: Contacto[];

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddReunionComponent>,
    private snackBar: MatSnackBar,
    private servicioReuniones: ReunionesService,
    private servicioZonas: ZonasService,
    private servicioMotivosReunion: MotivosReunionService,
    private servicioModosReunion: ModosReunionService,
    private servicioEntidades: EntidadesService,
    private servicioContactos: ContactosService,

  ){ }

  ngOnInit(): void {
    this.reunionForm = new FormGroup({
      reunion: new FormControl(null, Validators.required),
      id_contacto: new FormControl(null, Validators.required),
      id_modo_reunion: new FormControl(null, Validators.required),
      id_motivo_reunion: new FormControl(null, Validators.required),
      id_entidad_target: new FormControl(null),
      id_zona: new FormControl(null, Validators.required),
      objetivo: new FormControl(null),
      resultado: new FormControl(null),
      fecha: new FormControl(null, Validators.required),
      hora_inicio: new FormControl(null, Validators.required),
      hora_fin: new FormControl(null, Validators.required),
      ubicacion: new FormControl(null),
      localidad: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)

    });
    this.ENTIDAD = ENTIDAD_REUNION;

    this.getZonas();
    this.getMotivosReunion();
    this.getModosReunion();
    this.getEntidades();
    this.getDinamizadores();

   // console.log(this.reunionForm);
  }

  async confirmAdd() {
    //console.log(this.reunionForm);
    if (this.reunionForm.valid) {
      const modo_reunion = this.reunionForm.value as Reunion;

      const RESPONSE = await this.servicioReuniones.addReunion(modo_reunion).toPromise();

      //console.log(RESPONSE);

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

  async getZonas(){
    const RESPONSE = await this.servicioZonas.getAllZonas().toPromise();
    if (RESPONSE.ok){
      this.zonas = RESPONSE.data as Zona[];
    }
  }

  async getMotivosReunion(){
    const RESPONSE = await this.servicioMotivosReunion.getAllMotivosReunion().toPromise();
    if (RESPONSE.ok){
      this.motivos_reunion = RESPONSE.data as MotivoReunion[];
    }
  }

  async getModosReunion(){
    const RESPONSE = await this.servicioModosReunion.getAllModosReunion().toPromise();
    if (RESPONSE.ok){
      this.modos_reunion = RESPONSE.data as ModoReunion[];
    }
  }

  async getEntidades(){
    const RESPONSE_EO = await this.servicioEntidades.getAllEntidades().toPromise();
    if (RESPONSE_EO.ok) {
      const RESPONSE_ET = RESPONSE_EO;

      this.entidades_target = RESPONSE_EO.data as Entidad[];
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
