import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from '../shared/interfaces/api-response';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ERROR, CLOSE } from '../shared/messages';
import { Reunion } from '../shared/interfaces/reunion';
import { ReunionesService } from '../services/reuniones.service';

import { AddReunionComponent } from './add-reunion/add-reunion.component';
import { EditReunionComponent } from './edit-reunion/edit-reunion.component';
import { DeleteReunionComponent } from './delete-reunion/delete-reunion.component';
//import { AsistentesComponent } from './asistentes/asistentes.component';
import { DatosReunionComponent } from './datos-reunion/datos-reunion.component';
import { MotivosReunionService } from '../services/motivos-reunion.service';
import { ModosReunionService } from '../services/modos-reunion.service';
import { ZonasService } from '../services/zonas.service';
import { ContactosService } from '../services/contactos.service';
import { EntidadesService } from '../services/entidades.service';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrls: ['./reuniones.component.scss']
})
export class ReunionesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Reunion> = new MatTableDataSource();

  originalDatasource: Reunion[];

  idReunionFilter = new FormControl();
  reunionFilter = new FormControl();
  idMotivoReunionFilter = new FormControl();
  idEntidadTargetFilter = new FormControl();
  idZonaFilter = new FormControl();
  idContactoFilter = new FormControl();
  fechaFilter = new FormControl();
  
  selection: SelectionModel<Reunion>;
  reunion: Reunion;

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_reunion: '', id_contacto: '', fecha: '', reunion: '',id_motivo_reunion: '', id_entidad_target: '', id_zona: '' };

  constructor(
    public dialog: MatDialog,
    private reunionesService: ReunionesService,
    private motivoReunionService: MotivosReunionService,
    private modoReunionService: ModosReunionService,
    private zonaService: ZonasService,
    private contactoService: ContactosService,
    private entidadesService: EntidadesService,
    private overlay: Overlay,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.getReuniones();
  }

  /*
  async getReunion(idReunion: number) {
    const RESPONSE = await this.reunionesService.getReunion(idReunion).toPromise();
    if (RESPONSE.ok) {
      return RESPONSE.data;
    }
  }
  */

  async getReuniones() {
    const RESPONSE = await this.reunionesService.getAllReuniones().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.reunionesService.reuniones = RESPONSE.data as Reunion[];
      this.displayedColumns = ['id_contacto', 'fecha', 'reunion', 'id_motivo_reunion', 'id_entidad_target', 'id_zona', 'actions'];
      this.dataSource.data = this.reunionesService.reuniones;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.selection = new SelectionModel<Reunion>(false, [this.reunion]);

      this.onChanges();
    }  
  }

  async addReunion() {
    const dialogRef = this.dialog.open(AddReunionComponent, { scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //console.log(RESULT);
        this.ngOnInit();
        //this.datosReunion(reunion: Reunion);
      }
    }  
  }

  // async editReunion(reunion: Reunion) {
  //   const dialogRef = this.dialog.open(EditReunionComponent, { data: reunion, scrollStrategy: this.overlay.scrollStrategies.noop() });
  //   const RESULT = await dialogRef.afterClosed().toPromise();
  //   if (RESULT) {
  //     if (RESULT.ok) {
  //       this.ngOnInit();
  //     }
  //   }  
  // }

  async deleteReunion(reunion: Reunion) {
    const dialogRef = this.dialog.open(DeleteReunionComponent, { data: reunion, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }
  }

  async asistentes(reunion: Reunion) {
    /*
    const dialogRef = this.dialog.open(AsistentesComponent, { data: reunion, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.reunionesService.deleteReunion(RESULT.data);
        //this.dataSource.data = this.reunionesService.reunion;
        this.ngOnInit();
      }
    }
    */
  }

  createFilter(): (reunion: Reunion, filter: string) => boolean {
    const filterFunction = (reunion: Reunion, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return reunion.id_reunion.toString().indexOf(searchTerms.id_reunion) !== -1
        && reunion.reunion.toLowerCase().indexOf(searchTerms.reunion.toLowerCase()) !== -1
        && reunion.fk_motivo_reunion.toLowerCase().indexOf(searchTerms.id_motivo_reunion.toLowerCase()) !== -1
        && reunion.fk_entidad_target.toLowerCase().indexOf(searchTerms.id_entidad_target.toLowerCase()) !== -1
        && reunion.fk_zona.toLowerCase().indexOf(searchTerms.id_zona.toLowerCase()) !== -1
        && reunion.fk_contacto.toLowerCase().indexOf(searchTerms.id_contacto.toLowerCase()) !== -1
        && reunion.fecha.toLowerCase().indexOf(searchTerms.fecha.toLowerCase()) !== -1
        ;
    };

    return filterFunction;
  }

  onChanges() {
      this.idReunionFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_reunion = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.reunionFilter.valueChanges
      .subscribe(value => {
          this.filterValues.reunion = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 

      this.idMotivoReunionFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_motivo_reunion = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      this.idEntidadTargetFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_entidad_target = value;
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
  
      this.fechaFilter.valueChanges
      .subscribe(value => {
          this.filterValues.fecha = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 
  }

  async printReunion(reunion: Reunion) {
    const RESPONSE = await this.reunionesService.getInforme(reunion.id_reunion).toPromise();
    if (RESPONSE.ok) {
      const linkSource = `data:application/pdf;base64,${RESPONSE.data}`;
      const downloadLink = document.createElement('a');
      const fileName = 'Informe.pdf';

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
    }
  }

  async datosReunion(reunion: Reunion) {
    //const REUNION = await this.getReunion(idReunion);
    const REUNION = reunion;
    //const ASISTENTE = await this.getAsistentes();
    const CONTACTO = await this.getContacto();
    const ENTIDAD = await this.getEntidades();
    const MODO_REUNION = await this.getModosReunion();
    const MOTIVO_REUNION = await this.getMotivosReunion();
    const ZONA = await this.getZonas();

    if (REUNION) {
      const dialogRef = this.dialog.open(DatosReunionComponent, {
        width: '70em',
        maxWidth: '70em',
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        disableClose: true,
        data: {
          reunion: REUNION,
          //asistentes: ASISTENTE,
          contactos: CONTACTO,
          entidades: ENTIDAD,
          modosReunion: MODO_REUNION,
          motivosReunion: MOTIVO_REUNION,
          zonas: ZONA,
        }
      });
      
      const RESULT = await dialogRef.afterClosed().toPromise();
      await this.getReuniones();
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

  // async getAsistentes() {
  //   const RESPONSE = await this.tipoUrgenciaService.get().toPromise();
  //   if (RESPONSE.ok) {
  //     return RESPONSE.data;
  //   }
  // }

  async getContacto() {
    const RESPONSE = await this.contactoService.getAllDinamizadores().toPromise();
    if (RESPONSE.ok) {
      return RESPONSE.data;
    }
  }

  async getEntidades() {
    const RESPONSE = await this.entidadesService.getAllEntidades().toPromise();
    if (RESPONSE.ok) {
      return RESPONSE.data;
    }
  }

  async getModosReunion() {
    const RESPONSE = await this.modoReunionService.getAllModosReunion().toPromise();
    if (RESPONSE.ok) {
      return RESPONSE.data;
    }
  }

  async getMotivosReunion() {
    const RESPONSE = await this.motivoReunionService.getAllMotivosReunion().toPromise();
    if (RESPONSE.ok) {
      return RESPONSE.data;
    }
  }

  async getZonas() {
    const RESPONSE = await this.zonaService.getAllZonas().toPromise();
    if (RESPONSE.ok) {
      return RESPONSE.data;
    }
  }
}
