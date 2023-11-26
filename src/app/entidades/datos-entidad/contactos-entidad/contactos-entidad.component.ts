import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from 'src/app/shared/interfaces/api-response';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { Contacto } from 'src/app/shared/interfaces/contacto';
import { ContactosService } from 'src/app/services/contactos.service';

import { AddContactoComponent } from './add-contacto/add-contacto.component';
import { EditContactoComponent } from './edit-contacto/edit-contacto.component';
import { DeleteContactoComponent } from './delete-contacto/delete-contacto.component';
import { Entidad } from '../../../shared/interfaces/entidad';
import { EntidadesService } from '../../../services/entidades.service';
import { Reunion } from '../../../shared/interfaces/reunion';

@Component({
  selector: 'app-contactos-entidad',
  templateUrl: './contactos-entidad.component.html',
  styleUrls: ['./contactos-entidad.component.scss']
})
export class ContactosEntidadComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Contacto> = new MatTableDataSource();

  idContactoFilter = new FormControl();
  nombreCompletoFilter = new FormControl();
  cargoFilter = new FormControl();
  familiaFilter = new FormControl();
  entidad: Entidad;

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_contacto: '', nombre_completo: '', cargo: '', familia: '' };

  constructor(
    public dialog: MatDialog,
    private contactosService: ContactosService,
    private overlay: Overlay,

    public entidadService: EntidadesService
  ) { }

  ngOnInit(): void {
    this.entidad = this.entidadService.entidad;
    this.getContactosEntidad(this.entidad);
    //this.createFilter();
    //this.onChanges();
  }

  
  async getContactosEntidad(entidad: Entidad) {
    const RESPONSE = await this.contactosService.getContactosEntidad(entidad.id_entidad).toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.contactosService.contacto = RESPONSE.data as Contacto[];
      this.displayedColumns = ['nombre_completo', 'cargo', 'familia', 'actions'];
      this.dataSource.data = this.contactosService.contacto;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addContacto(idEntidad: number) {
    const dialogRef = this.dialog.open(AddContactoComponent, { data: idEntidad, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }  
  }

  async editContacto(contacto: Contacto) {
    const dialogRef = this.dialog.open(EditContactoComponent, { data: contacto, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }  
  }

  async deleteContacto(contacto: Contacto) {
    const dialogRef = this.dialog.open(DeleteContactoComponent, { data: contacto, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }
  }
  

  createFilter(): (contacto: Contacto, filter: string) => boolean {
    const filterFunction = (contacto: Contacto, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return contacto.id_contacto.toString().indexOf(searchTerms.id_contacto) !== -1
        && contacto.nombre_completo.toLowerCase().indexOf(searchTerms.nombre_completo.toLowerCase()) !== -1
        && contacto.cargo.toLowerCase().indexOf(searchTerms.cargo.toLowerCase()) !== -1
        && contacto.familia.toLowerCase().indexOf(searchTerms.familia.toLowerCase()) !== -1;
        // TODO Arreglar esto
    };

    return filterFunction;
  }

  onChanges() {
     this.idContactoFilter.valueChanges.subscribe(value => {
        this.filterValues.id_contacto = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.nombreCompletoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.nombre_completo = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.cargoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.cargo = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.familiaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.familia = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

}
