import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntidadesService } from 'src/app/services/entidades.service';
import { Zona } from 'src/app/shared/interfaces/zona';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { Contacto } from 'src/app/shared/interfaces/contacto';
import { DatosEntidadComponent} from '../datos-entidad.component';
import { TipoEntidad } from '../../../shared/interfaces/tipo-entidad';
import { Provincia } from '../../../shared/interfaces/provincia';
import { ENTIDAD_ENTIDAD } from '../../../shared/messages';

@Component({
  selector: 'app-datos-basicos-entidad',
  templateUrl: './datos-basicos-entidad.component.html',
  styleUrls: ['./datos-basicos-entidad.component.scss']
})
export class DatosBasicosEntidadComponent implements OnInit {

  datosBasicosForm: FormGroup;
  entidades: Entidad[];
  zonas: Zona[];
  tipos_entidad: TipoEntidad[];
  provincias: Provincia[];
  contactos: Contacto[];

  ENTIDAD: String;

  constructor(
    private datosEntidad: DatosEntidadComponent,
    public entidadService: EntidadesService,
  ) { 
    this.zonas = this.datosEntidad.datosEditarEntidad.zonas;
    this.tipos_entidad = this.datosEntidad.datosEditarEntidad.tiposEntidad;
    this.provincias = this.datosEntidad.datosEditarEntidad.provincias;
    this.contactos = this.datosEntidad.datosEditarEntidad.contactos;
  }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_ENTIDAD;
    this.setForm();

    this.datosBasicosForm.valueChanges.subscribe(form => {
      this.entidadService.setDatosBasicosEntidad(form);
    });
  }

  setForm(): void {
    this.datosBasicosForm = new FormGroup({
      id_entidad: new FormControl(this.entidadService.entidad.id_entidad, Validators.required),
      entidad: new FormControl(this.entidadService.entidad.entidad, Validators.required),
      id_zona: new FormControl(this.entidadService.entidad.id_zona, Validators.required),
      id_contacto: new FormControl(this.entidadService.entidad.id_contacto, Validators.required),
      id_tipo_entidad: new FormControl(this.entidadService.entidad.id_tipo_entidad, Validators.required),
      direccion: new FormControl(this.entidadService.entidad.direccion),
      cp: new FormControl(this.entidadService.entidad.cp),
      localidad: new FormControl(this.entidadService.entidad.localidad),
      id_provincia: new FormControl(this.entidadService.entidad.id_provincia),
      telefono: new FormControl(this.entidadService.entidad.telefono),
      email: new FormControl(this.entidadService.entidad.email),
      web: new FormControl(this.entidadService.entidad.web),
      codigo: new FormControl(this.entidadService.entidad.codigo),
      observaciones: new FormControl(this.entidadService.entidad.observaciones)

    });    
  }
}
