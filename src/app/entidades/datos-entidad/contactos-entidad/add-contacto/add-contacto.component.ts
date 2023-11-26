import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contacto } from 'src/app/shared/interfaces/contacto';
import { ContactosService } from 'src/app/services/contactos.service';
import { CLOSE, INVALID_FORM, ENTIDAD_CONTACTO } from 'src/app/shared/messages';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { Provincia } from 'src/app/shared/interfaces/provincia';
import { ZonasService } from 'src/app/services/zonas.service';
import { Zona } from 'src/app/shared/interfaces/zona';
import { EntidadesService } from 'src/app/services/entidades.service';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { FamiliasService } from 'src/app/services/familias.service';
import { Familia } from 'src/app/shared/interfaces/familia';

@Component({
  selector: 'app-add-contacto',
  templateUrl: './add-contacto.component.html',
  styleUrls: ['./add-contacto.component.scss']
})
export class AddContactoComponent implements OnInit {
  contactoForm: FormGroup;
  provincias: Provincia[];
  zonas: Zona[];
  entidades: Entidad[];
  familias: Familia[];

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddContactoComponent>,
    private snackBar: MatSnackBar,
    private servicioContactos: ContactosService,
    private servicioProvincia: ProvinciasService,
    private servicioZona: ZonasService,
    private servicioEntidad: EntidadesService,
    private servicioFamilia: FamiliasService,
    @Inject(MAT_DIALOG_DATA) public idEntidad: number,


  ){ }

  ngOnInit(): void {
    this.contactoForm = new FormGroup({
      //id_contacto: new FormControl(this.contacto.id_contacto, Validators.required),
      nombre: new FormControl(null),
      apellidos: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      corporativo_largo: new FormControl(null),
      corporativo_corto: new FormControl(null),
      telefono_personal: new FormControl(null),
      id_zona: new FormControl(null),
      id_entidad: new FormControl(this.idEntidad, Validators.required),
      cargo: new FormControl(null),
      id_familia: new FormControl(null),
      direccion: new FormControl(null),
      cp: new FormControl(null),
      localidad: new FormControl(null),
      id_provincia: new FormControl(null),
      observaciones: new FormControl(null)
    });
    this.ENTIDAD = ENTIDAD_CONTACTO;

    this.getProvincias();
    this.getZonas();
    this.getEntidades();
    this.getFamilias();

  }

  async confirmAdd() {
    if (this.contactoForm.valid) {
      const contacto = this.contactoForm.value as Contacto;

      const RESPONSE = await this.servicioContactos.addContacto(contacto).toPromise();
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

  async getEntidades(){
    const RESPONSE = await this.servicioEntidad.getAllEntidades().toPromise();
    if (RESPONSE.ok){
      this.entidades = RESPONSE.data as Entidad[];
    }
  }

  async getFamilias(){
    const RESPONSE = await this.servicioFamilia.getAllFamilias().toPromise();
    if (RESPONSE.ok){
      this.familias = RESPONSE.data as Familia[];
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }  

  get email() {
    return this.contactoForm.get('email');
  }
}
