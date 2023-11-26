import { Component, OnInit, ViewChild, Inject } from '@angular/core';
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
import { Asistente } from 'src/app/shared/interfaces/asistente';
import { AsistentesService } from 'src/app/services/asistentes.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CLOSE } from 'src/app/shared/messages';
import { Reunion } from 'src/app/shared/interfaces/reunion';

@Component({
  selector: 'app-add-asistente',
  templateUrl: './add-asistente.component.html',
  styleUrls: ['./add-asistente.component.scss']
})
export class AddAsistenteComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Contacto> = new MatTableDataSource();
  idContactoFilter = new FormControl();
  nombreCompletoFilter = new FormControl();
  cargoFilter = new FormControl();
  entidadFilter = new FormControl();
  permises: Permises;
  displayedColumns: string[];
  private filterValues = { id_contacto: '', nombre_completo: '', cargo: '', entidad: '' };

  constructor(
    public dialog: MatDialog,
    private contactosService: ContactosService,
    private asistentesService: AsistentesService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddAsistenteComponent>,

    @Inject(MAT_DIALOG_DATA) public reunion: Reunion,

  ) { }

  ngOnInit(): void {
    this.getContactos();

  }

  async getContactos() {
    const RESPONSE = await this.contactosService.getContactosDisponibles(this.reunion.id_reunion).toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.contactosService.contacto = RESPONSE.data as Contacto[];
      this.displayedColumns = ['nombre_completo', 'cargo', 'entidad', 'actions'];
      this.dataSource.data = this.contactosService.contacto;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addAsistente( {id_contacto}: Contacto) {
    const asistente: Asistente = {
      id_contacto: id_contacto,
      id_reunion: this.reunion.id_reunion,
    }

    const RESPONSE = await this.asistentesService.addAsistente(asistente).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      //this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      this.getContactos();
    } else { 
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }


  createFilter(): (contacto: Contacto, filter: string) => boolean {
    const filterFunction = (contacto: Contacto, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return contacto.id_contacto.toString().indexOf(searchTerms.id_contacto) !== -1
        && contacto.nombre_completo.toLowerCase().indexOf(searchTerms.nombre_completo.toLowerCase()) !== -1
        && contacto.cargo.toLowerCase().indexOf(searchTerms.cargo.toLowerCase()) !== -1
        && contacto.entidad.toLowerCase().indexOf(searchTerms.entidad.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idContactoFilter.valueChanges
      .subscribe(value => {
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
