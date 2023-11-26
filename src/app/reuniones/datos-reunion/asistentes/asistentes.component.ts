import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from 'src/app/shared/interfaces/api-response';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { Asistente } from 'src/app/shared/interfaces/asistente';
import { Reunion } from 'src/app/shared/interfaces/reunion';
import { AsistentesService } from 'src/app/services/asistentes.service';

import { AddAsistenteComponent } from './add-asistente/add-asistente.component';
import { DeleteAsistenteComponent } from './delete-asistente/delete-asistente.component';

import { CLOSE, ERROR } from 'src/app/shared/messages';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReunionesService } from 'src/app/services/reuniones.service';


@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.component.html',
  styleUrls: ['./asistentes.component.scss']
})
export class AsistentesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Asistente> = new MatTableDataSource();

  idAsistenteFilter = new FormControl();
  nombreCompletoFilter = new FormControl();
  cargoFilter = new FormControl();
  entidadFilter = new FormControl();
  reunion: Reunion;


  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_asistente: '', nombre_completo: '', cargo: '', entidad: '' };

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AsistentesComponent>,

    private asistentesService: AsistentesService,
    private overlay: Overlay,

    //@Inject(MAT_DIALOG_DATA) public reunion: Reunion,
    public snackBar: MatSnackBar,
    public reunionService: ReunionesService,


    
  ) { }

  ngOnInit(): void {
    //this.getAsistentes(this.reunion);
    this.reunion = this.reunionService.reunion;
    this.getAsistentes(this.reunion);
  }

  
  //async getAsistentes(reunion: Reunion) {
  async getAsistentes({id_reunion}: Reunion) {
    //const RESPONSE = await this.asistentesService.getAllAsistentes(reunion).toPromise();
    const RESPONSE = await this.asistentesService.getAllAsistentes(id_reunion).toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.asistentesService.asistente = RESPONSE.data as Asistente[];
      this.displayedColumns = ['NombreCompleto', 'Cargo', 'Entidad', 'actions'];
      this.dataSource.data = this.asistentesService.asistente;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addAsistente() {
    
    const dialogRef = this.dialog.open(AddAsistenteComponent, { data: this.reunion, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    this.ngOnInit();


    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
        console.log('test');
      } else {
        //this.snackBar.open(ERROR, CLOSE, { duration: 5000 });
        // No vamos a indicar de neuvo otro fallo, ya lo dice la ventana anterior

      }
      
    } 
     
  }

  async deleteAsistente(asistente: Asistente) {
    
    const dialogRef = this.dialog.open(DeleteAsistenteComponent, { data: asistente, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.asistentesService.deleteAsistente(RESULT.data);
        //this.dataSource.data = this.asistentesService.asistente;
        this.ngOnInit();
      }
    }
    
  }

  createFilter(): (asistente: Asistente, filter: string) => boolean {
    const filterFunction = (asistente: Asistente, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return asistente.id_asistente.toString().indexOf(searchTerms.id_asistente) !== -1
        && asistente.nombre_completo.toLowerCase().indexOf(searchTerms.nombre_completo.toLowerCase()) !== -1
        && asistente.cargo.toLowerCase().indexOf(searchTerms.cargo.toLowerCase()) !== -1
        && asistente.entidad.toLowerCase().indexOf(searchTerms.entidad.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idAsistenteFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_asistente = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.cargoFilter.valueChanges
      .subscribe(value => {
          this.filterValues.nombre_completo = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 

      this.cargoFilter.valueChanges
      .subscribe(value => {
          this.filterValues.cargo = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.entidadFilter.valueChanges
      .subscribe(value => {
          this.filterValues.entidad = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 

  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

}
