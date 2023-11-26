import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddOpcionComponent } from './add-opcion/add-opcion.component';
import { EditOpcionComponent } from './edit-opcion/edit-opcion.component';
import { DeleteOpcionComponent } from './delete-opcion/delete-opcion.component';
import { OpcionesService } from '../services/opciones.service';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
import { Opcion } from '../shared/interfaces/opcion';
import { Permises } from '../shared/interfaces/api-response';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss']
})
export class OpcionesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Opcion> = new MatTableDataSource();

  idFilter = new FormControl();
  opcionFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_opcion_menu: '', opcion: '' };

  constructor(
              public dialog: MatDialog,
              private opcionesService: OpcionesService,
              private overlay: Overlay
              ) { }

  ngOnInit() {
    this.getOpciones();
  }

  async getOpciones() {
    const RESPONSE = await this.opcionesService.getAllOpciones().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.opcionesService.opciones = RESPONSE.data as Opcion[];
      this.displayedColumns = ['id_opcion_menu', 'opcion', 'actions'];
      this.dataSource.data = this.opcionesService.opciones;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();

      this.onChanges();
    }
  }

  async addOpcion() {
    const dialogRef = this.dialog.open(AddOpcionComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.opcionesService.opciones.push(RESULT.data);
        this.dataSource.data = this.opcionesService.opciones;
      }
    }
  }

  async editOpcion(opcion: Opcion) {
    const dialogRef = this.dialog.open(EditOpcionComponent, { data: opcion, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.opcionesService.updateOpcion(RESULT.data);
        this.dataSource.data = this.opcionesService.opciones;
      }
    }
  }

  async deleteOpcion(opcion: Opcion) {
    const dialogRef = this.dialog.open(DeleteOpcionComponent, { data: opcion, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.opcionesService.removeOpcion(RESULT.data);
        this.dataSource.data = this.opcionesService.opciones;
      }
    }
  }

  createFilter(): (opcion: Opcion, filter: string) => boolean {
    const filterFunction = (opcion: Opcion, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);

        return opcion.id_opcion_menu.toString().indexOf(searchTerms.id_opcion_menu) !== -1
            && opcion.opcion.toLowerCase().indexOf(searchTerms.opcion.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

onChanges(): void {
    this.idFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_opcion_menu = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.opcionFilter.valueChanges
    .subscribe(value => {
        this.filterValues.opcion = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });  
  }


}
