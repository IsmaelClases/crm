import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from '../shared/interfaces/api-response';

import { Contacto } from '../shared/interfaces/contacto';
import { ContactosService } from '../services/contactos.service';

import { AddContactoComponent } from './add-contacto/add-contacto.component';
import { EditContactoComponent } from './edit-contacto/edit-contacto.component';
import { DeleteContactoComponent } from './delete-contacto/delete-contacto.component';

import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Contacto> = new MatTableDataSource();

  idContactoFilter = new FormControl();
  nombreCompletoFilter = new FormControl();
  cargoFilter = new FormControl();
  direccionCompletaFilter = new FormControl();
  entidadFilter = new FormControl();
  familiaFilter = new FormControl();

  permises: Permises;

  selection: SelectionModel<Contacto>;
  contacto: Contacto;

  displayedColumns: string[];
  private filterValues = { id_contacto: '', nombre_completo: '', cargo: '', direccion_completa: '', entidad: '', familia: '' };

  constructor(
    public dialog: MatDialog,
    private contactosService: ContactosService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getContactos();
    //this.createFilter();
    //this.onChanges();
  }

  
  async getContactos() {
    const RESPONSE = await this.contactosService.getAllContactos().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.contactosService.contacto = RESPONSE.data as Contacto[];
      this.displayedColumns = ['nombre_completo', 'cargo', 'direccion_completa', 'entidad', 'familia', 'actions'];
      this.dataSource.data = this.contactosService.contacto;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.selection = new SelectionModel<Contacto>(false, [this.contacto]);

      this.onChanges();
    }  
  }

  async addContacto() {
    const dialogRef = this.dialog.open(AddContactoComponent, { scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.contactosService.contacto.push(RESULT.data);
        //this.dataSource.data = this.contactosService.contacto;
        this.ngOnInit();
      }
    }  
  }

  async editContacto(contacto: Contacto) {
    const dialogRef = this.dialog.open(EditContactoComponent, { data: contacto, scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.contactosService.editContacto(RESULT.data);
        //this.dataSource.data = this.contactosService.contacto;
        this.ngOnInit();
      }
    }  
  }

  async deleteContacto(contacto: Contacto) {
    const dialogRef = this.dialog.open(DeleteContactoComponent, { data: contacto, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.contactosService.deleteContacto(RESULT.data);
        //this.dataSource.data = this.contactosService.contacto;
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
        && contacto.direccion_completa.toLowerCase().indexOf(searchTerms.direccion_completa.toLowerCase()) !== -1
        && contacto.entidad.toLowerCase().indexOf(searchTerms.entidad.toLowerCase()) !== -1
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
    
    this.direccionCompletaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.direccion_completa = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.entidadFilter.valueChanges
    .subscribe(value => {
        this.filterValues.entidad = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.familiaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.familia = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }



}
