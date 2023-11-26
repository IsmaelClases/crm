import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactosService } from 'src/app/services/contactos.service';
import { Contacto } from 'src/app/shared/interfaces/contacto';
import { CLOSE, ENTIDAD_CONTACTO, ERROR } from '../../shared/messages';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { Provincia } from 'src/app/shared/interfaces/provincia';
import { ZonasService } from 'src/app/services/zonas.service';
import { Zona } from 'src/app/shared/interfaces/zona';
import { EntidadesService } from 'src/app/services/entidades.service';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { FamiliasService } from 'src/app/services/familias.service';
import { Familia } from 'src/app/shared/interfaces/familia';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit-contacto',
  templateUrl: './edit-contacto.component.html',
  styleUrls: ['./edit-contacto.component.scss']
})
export class EditContactoComponent implements OnInit {

  contactoForm: FormGroup;
  provincias: Provincia[];
  zonas: Zona[];
  entidades: Entidad[];
  familias: Familia[];

  // Para autocompletar...
  //familias: any[]
  //arrayFiltradoAutocomplete: any[] = [];
  //filteredOptions: Observable<any[]>;



  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditContactoComponent>,
    private snackBar: MatSnackBar,
    private servicioContactos: ContactosService,
    @Inject(MAT_DIALOG_DATA) public contacto: Contacto,
    private servicioProvincia: ProvinciasService,
    private servicioZona: ZonasService,
    private servicioEntidad: EntidadesService,
    private servicioFamilia: FamiliasService,

  ) { }

  ngOnInit(): void {
    this.setForm();
    //this.setFilter();
  }

  setForm() {
    this.ENTIDAD = ENTIDAD_CONTACTO;
    this.contactoForm = new FormGroup({
      id_contacto: new FormControl(this.contacto.id_contacto, Validators.required),
      nombre: new FormControl(this.contacto.nombre),
      apellidos: new FormControl(this.contacto.apellidos, Validators.required),
      email: new FormControl(this.contacto.email, [Validators.required, Validators.email]),
      corporativo_largo: new FormControl(this.contacto.corporativo_largo),
      corporativo_corto: new FormControl(this.contacto.corporativo_corto),
      telefono_personal: new FormControl(this.contacto.telefono_personal),
      id_zona: new FormControl(this.contacto.id_zona),
      id_entidad: new FormControl(this.contacto.id_entidad, Validators.required),
      cargo: new FormControl(this.contacto.cargo),
      id_familia: new FormControl(this.contacto.id_familia),
      direccion: new FormControl(this.contacto.direccion),
      cp: new FormControl(this.contacto.cp),
      localidad: new FormControl(this.contacto.localidad),
      id_provincia: new FormControl(this.contacto.id_provincia),
      observaciones: new FormControl(this.contacto.observaciones)
    });

    this.getProvincias();
    this.getZonas();
    this.getEntidades();
    this.getFamilias();
  }

  async confirmEdit(){
    console.log(this.contacto);
    if (this.contactoForm.valid) {
      const contactoForm = this.contactoForm.value;

      const RESPONSE = await this.servicioContactos.editContacto(contactoForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    console.log(this.contacto);
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
    this.dialogRef.close({ ok: false });
  }

  get email() {
    return this.contactoForm.get('email');
  }
/*
  private filterFamilia(val: string): any[] {
    if (!val) {
        return [];
    }
    const filterValue = val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (val.length >= 3) {
      console.log(this.arrayFiltradoAutocomplete);
      return this.arrayFiltradoAutocomplete = this.familias
                                                            .filter(familia =>
                                                                        familia
                                                                            .familia
                                                                            .normalize('NFD')
                                                                            .replace(/[\u0300-\u036f]/g, '')
                                                                            .toLowerCase()
                                                                            .includes(filterValue)
                                                                        );
    } else {
      return [];
    }
  }

  public valueMapper = (key) => {
    const selection = this.familias.find(e => e.id_familia === key);
    if (!key) {
        return '';
    }
    if (selection) {
      return selection.familia;
    }
  }

  setFilter() {
    this.filteredOptions = this.contactoForm.controls.id_familia.valueChanges.pipe(
        startWith(''),
        map(val => this.filterFamilia(val))
    );
  }

  clearAutor() {
    this.contactoForm.controls.id_familia.setValue(null);
  }
*/
}
