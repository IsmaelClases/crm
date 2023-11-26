import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReunionesService } from 'src/app/services/reuniones.service';
import { Reunion } from 'src/app/shared/interfaces/reunion';
import { CLOSE, ENTIDAD_ENTIDAD, ERROR, ENTIDAD_REUNION } from '../../shared/messages';
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
  selector: 'app-edit-reunion',
  templateUrl: './edit-reunion.component.html',
  styleUrls: ['./edit-reunion.component.scss']
})
export class EditReunionComponent implements OnInit {

  reunionForm: FormGroup;
  reuniones: Reunion[];
  zonas: Zona[];
  modos_reunion: ModoReunion[];
  motivos_reunion: MotivoReunion[];
  entidades_target: Entidad[];
  contactos: Contacto[];

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditReunionComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public reunion: Reunion,
    private servicioReuniones: ReunionesService,
    private servicioZonas: ZonasService,
    private servicioMotivosReunion: MotivosReunionService,
    private servicioModosReunion: ModosReunionService,
    private servicioEntidades: EntidadesService,
    private servicioContactos: ContactosService,
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_REUNION;
    this.reunionForm = new FormGroup({
      id_reunion: new FormControl(this.reunion.id_reunion, Validators.required),

      reunion: new FormControl(this.reunion.reunion, Validators.required),
      id_contacto: new FormControl(this.reunion.id_contacto, Validators.required),
      id_modo_reunion: new FormControl(this.reunion.id_modo_reunion, Validators.required),
      id_motivo_reunion: new FormControl(this.reunion.id_motivo_reunion, Validators.required),
      id_entidad_target: new FormControl(this.reunion.id_entidad_target, Validators.required),
      id_zona: new FormControl(this.reunion.id_zona, Validators.required),
      objetivo: new FormControl(this.reunion.objetivo, Validators.required),
      resultado: new FormControl(this.reunion.resultado),
      fecha: new FormControl(this.reunion.fecha, Validators.required),
      hora_inicio: new FormControl(this.reunion.hora_inicio, Validators.required),
      hora_fin: new FormControl(this.reunion.hora_fin, Validators.required),
      ubicacion: new FormControl(this.reunion.ubicacion),
      observaciones: new FormControl(this.reunion.observaciones)

    });

    this.getZonas();
    this.getMotivosReunion();
    this.getModosReunion();
    this.getEntidades();
    this.getDinamizadores();
  }

  async confirmEdit(){
    if (this.reunionForm.valid) {
      const reunionForm = this.reunionForm.value;

      const RESPONSE = await this.servicioReuniones.editReunion(reunionForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
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
    this.dialogRef.close({ ok: false });
  }
}
