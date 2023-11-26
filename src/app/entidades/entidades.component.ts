import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from '../shared/interfaces/api-response';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, ERROR } from '../shared/messages';

import { Entidad } from '../shared/interfaces/entidad';
import { EntidadesService } from '../services/entidades.service';

import { AddEntidadComponent } from './add-entidad/add-entidad.component';
import { EditEntidadComponent } from './edit-entidad/edit-entidad.component';
import { DeleteEntidadComponent } from './delete-entidad/delete-entidad.component';
import { DatosEntidadComponent } from './datos-entidad/datos-entidad.component';

import { ProvinciasService } from 'src/app/services/provincias.service';
import { Provincia } from 'src/app/shared/interfaces/provincia';
import { ZonasService } from 'src/app/services/zonas.service';
import { Zona } from 'src/app/shared/interfaces/zona';
import { TiposEntidadService } from 'src/app/services/tipos-entidad.service';
import { TipoEntidad } from 'src/app/shared/interfaces/tipo-entidad';
import { ContactosService } from 'src/app/services/contactos.service';
import { Contacto } from 'src/app/shared/interfaces/contacto';

import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss']
})
export class EntidadesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Entidad> = new MatTableDataSource();

  idEntidadFilter = new FormControl();
  entidadFilter = new FormControl();
  idTipoEntidadFilter = new FormControl();
  idZonaFilter = new FormControl();
  idContactoFilter = new FormControl();
  entidadesSelected: Entidad [] = [];

  isChecked = false;
  isCheckedAll = false;
  pageSizeChecked: number;
  pageIndexChecked: number;

  permises: Permises;

  selection: SelectionModel<Entidad>;
  entidad: Entidad;

  displayedColumns: string[];
  private filterValues = { id_entidad: '', entidad: '',id_tipo_entidad: '', id_zona: '', id_contacto: '' };

  constructor(
    public dialog: MatDialog,
    private entidadesService: EntidadesService,
    private servicioZona: ZonasService,
    private servicioTipoEntidad: TiposEntidadService,
    private servicioProvincia: ProvinciasService,
    private servicioContacto: ContactosService,
    
    private overlay: Overlay,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,

    


  ) { }

  ngOnInit(): void {
    this.getEntidades();
  }

  
  async getEntidades() {
    const RESPONSE = await this.entidadesService.getAllEntidades().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.entidadesService.entidades = RESPONSE.data as Entidad[];
      this.displayedColumns = ['entidad', 'id_tipo_entidad', 'id_zona', 'id_contacto', 'actions'];
      this.dataSource.data = this.entidadesService.entidades;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.selection = new SelectionModel<Entidad>(false, [this.entidad]);

      this.onChanges();
    }  
  }

  async addEntidad() {
    const dialogRef = this.dialog.open(AddEntidadComponent, { scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.entidadesService.entidad.push(RESULT.data);
        //this.dataSource.data = this.entidadesService.entidad;
        this.ngOnInit();
      }
    }  
  }

  async editEntidad(entidad: Entidad) {
    const dialogRef = this.dialog.open(EditEntidadComponent, { data: entidad, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.entidadesService.editEntidad(RESULT.data);
        //this.dataSource.data = this.entidadesService.entidad;
        this.ngOnInit();
      }
    }  
  }

  async deleteEntidad(entidad: Entidad) {
    const dialogRef = this.dialog.open(DeleteEntidadComponent, { data: entidad, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.entidadesService.deleteEntidad(RESULT.data);
        //this.dataSource.data = this.entidadesService.entidad;
        this.ngOnInit();
      }
    }
  }

  changePage() {
    if (this.isCheckedAll) {
      this.isChecked = true;
    } else {
      this.isChecked = (((this.pageIndexChecked + 1) * this.pageSizeChecked) /
      ((this.dataSource.paginator.pageIndex + 1) * this.dataSource.paginator.pageSize)) >= 1;
    }
  }

  chooseAllPublicacion(event) {
    this.isChecked = event.checked;
    this.entidadesSelected = this.entidadesSelected; ///?????????????

    const min = this.dataSource.paginator.pageSize * this.dataSource.paginator.pageIndex;
    const max = this.dataSource.paginator.pageSize * (this.dataSource.paginator.pageIndex + 1);

    let i = 0;
    if (event.checked) {

      this.pageIndexChecked = this.dataSource.paginator.pageIndex;
      this.pageSizeChecked = this.dataSource.paginator.pageSize;

      this.dataSource.filteredData.forEach(publicacion => {
        if ((i >= min && i < max)) {
          if (publicacion.checked !== true) {
            publicacion.checked = true;
            this.entidadesSelected.push(publicacion);
          }
        }
        i++;
      });

      if (this.entidadesSelected.length < this.dataSource.filteredData.length) {
        this.openSnackbarChooseAllPublicacion();
      }
    } else {

      this.isCheckedAll = false;

      this.entidadesSelected = [];

      this.pageIndexChecked = 0;
      this.pageSizeChecked = 0;

      this.dataSource.filteredData.forEach(data => {
        data.checked = false;
      });
    }
  }

  openSnackbarChooseAllPublicacion() {
    const snackBarRef = this.snackBar.open(
      `Deseas Seleccionar los ${this.dataSource.filteredData.length} resultados`,
      'Seleccionar',
      { duration: 5000 }
    );
    snackBarRef.afterDismissed().subscribe(info => {
      if (info.dismissedByAction === true) {
        this.isCheckedAll = true;
        this.entidadesSelected = [];
        this.dataSource.filteredData.forEach(publicacion => {
          this.entidadesSelected.push(publicacion);
          publicacion.checked = true;
        });
      }
    });
  }

  // Devuelve los emails de los contactos
  async getContactos() {
    const contactosDeEntidades: string[] = [];
    this.entidadesSelected.filter(entidad => { contactosDeEntidades.push(entidad.id_entidad.toString()); });
  
    if (contactosDeEntidades.length > 0) {
      const RESPONSE = await this.entidadesService.getContactos(contactosDeEntidades).toPromise();

      console.log(RESPONSE);

      if (RESPONSE) {
        if (RESPONSE.ok) {
          this.clipboard.copy(RESPONSE.data);
          this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        } else {
          this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        }
      } else {
        this.snackBar.open(ERROR, CLOSE, { duration: 5000 });
      }
    }
  }

  chooseEntidad(idEntidad, event) {

    if (event.checked) {
      this.dataSource.filteredData.filter(entidad => {

          if (entidad.id_entidad === idEntidad) {
            this.entidadesSelected.push(entidad);
            entidad.checked = true;
          }
      });
    } else {
      this.entidadesSelected = this.entidadesSelected.filter(entidad => {
        if (entidad.id_entidad === idEntidad) {
          entidad.checked = false;
        }
        return idEntidad !== entidad.id_entidad;
      });
    }

    //console.log(this.entidadesSelected);
  }

  async getProvincias(){
    const RESPONSE = await this.servicioProvincia.getAllProvincias().toPromise();
    if (RESPONSE.ok){
      return RESPONSE.data as Provincia[];
    }
  }

  async getZonas(){
    const RESPONSE = await this.servicioZona.getAllZonas().toPromise();
    if (RESPONSE.ok){
      return RESPONSE.data as Zona[];
    }
  }

  async getTiposEntidad(){
    const RESPONSE = await this.servicioTipoEntidad.getAllTiposEntidad().toPromise();
    if (RESPONSE.ok){
      return RESPONSE.data as TipoEntidad[];
    }
  }

  async getDinamizadores(){
    const RESPONSE = await this.servicioContacto.getAllDinamizadores().toPromise();
    if (RESPONSE.ok){
      return RESPONSE.data as Contacto[];
    }
  }

  async datosEntidad(entidad: Entidad) {
    const ENTIDAD = entidad;
    const DINAMIZADOR = await this.getDinamizadores();
    const TIPO_ENTIDAD = await this.getTiposEntidad();
    const PROVINCIA = await this.getProvincias();
    //const CONTACTOS = await this.getContactos();
    //const CICLOS = await this.getCiclos();
    const ZONA = await this.getZonas();

    if (ENTIDAD) {
      const dialogRef = this.dialog.open(DatosEntidadComponent, {
        width: '70em',
        maxWidth: '70em',
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        disableClose: true,
        data: {
          entidad: ENTIDAD,
          contactos: DINAMIZADOR,
          tipos_entidad: TIPO_ENTIDAD,
          provincias: PROVINCIA,
          zonas: ZONA,
        }
      });
      
      const RESULT = await dialogRef.afterClosed().toPromise();
      await this.getEntidades();
      /*
      let var_reunion;
      var_reunion = this.originalDatasource.filter(reunion => {
        return reunion.id_reunion === RESULT.reunion.id_reunion;
      });
      */
      //this.ngOnInit();
      //this.selection = new SelectionModel<PublicacionDHL>(false, [publicacio[0]]);
      //this.fiterEstados();

      //this.selection = new SelectionModel<Reunion>(false, [publicacio[0]]);

    }
  }

  createFilter(): (entidad: Entidad, filter: string) => boolean {
    const filterFunction = (entidad: Entidad, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return entidad.id_entidad.toString().indexOf(searchTerms.id_entidad) !== -1
        && entidad.entidad.toLowerCase().indexOf(searchTerms.entidad.toLowerCase()) !== -1
        && entidad.fk_tipo_entidad.toLowerCase().indexOf(searchTerms.id_tipo_entidad.toLowerCase()) !== -1
        && entidad.fk_zona.toLowerCase().indexOf(searchTerms.id_zona.toLowerCase()) !== -1
        && entidad.fk_contacto.toLowerCase().indexOf(searchTerms.id_contacto.toLowerCase()) !== -1
        ;
    };

    return filterFunction;
  }

  onChanges() {
    this.idEntidadFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_entidad = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.entidadFilter.valueChanges
    .subscribe(value => {
        this.filterValues.entidad = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idTipoEntidadFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_tipo_entidad = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idZonaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_zona = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idContactoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_contacto = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

}
