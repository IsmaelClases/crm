import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReunionesService } from 'src/app/services/reuniones.service';
import { Reunion } from 'src/app/shared/interfaces/reunion';
import { ENTIDAD_REUNION } from 'src/app/shared/messages';
import { Zona } from 'src/app/shared/interfaces/zona';
import { MotivoReunion } from 'src/app/shared/interfaces/motivo-reunion';
import { ModoReunion } from 'src/app/shared/interfaces/modo-reunion';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { Contacto } from 'src/app/shared/interfaces/contacto';
import { DatosReunionComponent} from '../datos-reunion.component';

@Component({
  selector: 'app-datos-basicos',
  templateUrl: './datos-basicos-reunion.component.html',
  styleUrls: ['./datos-basicos-reunion.component.scss']
})
export class DatosBasicosReunionComponent implements OnInit {

  datosBasicosForm: FormGroup;
  reuniones: Reunion[];
  zonas: Zona[];
  modos_reunion: ModoReunion[];
  motivos_reunion: MotivoReunion[];
  entidades_target: Entidad[];
  contactos: Contacto[];

  ENTIDAD: String;

  constructor(
    private datosReunion: DatosReunionComponent,
    public reunionService: ReunionesService,
  ) { 

    this.zonas = this.datosReunion.datosEditarReunion.zonas;
    this.modos_reunion = this.datosReunion.datosEditarReunion.modosReunion;
    this.motivos_reunion = this.datosReunion.datosEditarReunion.motivosReunion;
    this.entidades_target = this.datosReunion.datosEditarReunion.entidades;
    this.contactos = this.datosReunion.datosEditarReunion.contactos;
  }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_REUNION;
    this.setForm();

    this.datosBasicosForm.valueChanges.subscribe(form => {
      this.reunionService.setDatosBasicosReunion(form);
    });

  }

  setForm(): void {
    this.datosBasicosForm = new FormGroup({
      id_reunion: new FormControl(this.reunionService.reunion.id_reunion, Validators.required),
      reunion: new FormControl(this.reunionService.reunion.reunion, Validators.required),
      id_contacto: new FormControl(this.reunionService.reunion.id_contacto, Validators.required),
      id_modo_reunion: new FormControl(this.reunionService.reunion.id_modo_reunion, Validators.required),
      id_motivo_reunion: new FormControl(this.reunionService.reunion.id_motivo_reunion, Validators.required),
      id_entidad_target: new FormControl(this.reunionService.reunion.id_entidad_target, Validators.required),
      id_zona: new FormControl(this.reunionService.reunion.id_zona, Validators.required),
      fecha: new FormControl(this.reunionService.reunion.fecha, Validators.required),
      hora_inicio: new FormControl(this.reunionService.reunion.hora_inicio, Validators.required),
      hora_fin: new FormControl(this.reunionService.reunion.hora_fin, Validators.required),
      ubicacion: new FormControl(this.reunionService.reunion.ubicacion),
      localidad: new FormControl(this.reunionService.reunion.localidad),
      observaciones: new FormControl(this.reunionService.reunion.observaciones)

    });    
  }

}
