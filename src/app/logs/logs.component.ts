import { Component, OnInit, ViewChild } from '@angular/core';
import { LogsService } from '../services/logs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Log } from '../shared/interfaces/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Log> = new MatTableDataSource();

  idFilter = new FormControl();
  fechaFilter = new FormControl();
  usuarioFilter = new FormControl();
  contenidoFilter = new FormControl();
  tipoLogFilter = new FormControl();

  displayedColumns: string[] = ['id_log', 'fecha', 'usuario', 'contenido', 'tipo_log'];
  private filterValues = { id_log: '', fecha: '', usuario: '', contenido: '', tipo_log: '' };

  constructor(public dialog: MatDialog, private logService: LogsService) { }

  ngOnInit() {
    this.getLogs();
  }

  async getLogs() {
    const RESPONSE = await this.logService.getAllLogs().toPromise();
    if (RESPONSE.ok) {
      this.dataSource.data = RESPONSE.data as Log[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();

      this.onChanges();
    }
  }

  createFilter(): (log: Log, filter: string) => boolean {
    const filterFunction = (log: Log, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);

        return log.id_log.toString().indexOf(searchTerms.id_log) !== -1
            && log.fecha.toLowerCase().indexOf(searchTerms.fecha.toLowerCase()) !== -1
            && log.contenido.toLowerCase().indexOf(searchTerms.contenido.toLowerCase()) !== -1
            && log.tipo_log.toLowerCase().indexOf(searchTerms.tipo_log.toLowerCase()) !== -1
            && log.usuario != null ? log.usuario.toLowerCase().indexOf(searchTerms.usuario.toLowerCase()) !== -1 : false;
    };
    return filterFunction;
}

onChanges() {

  combineLatest(
    [this.idFilter.valueChanges.pipe(startWith('')),
    this.fechaFilter.valueChanges.pipe(startWith('')),
    this.usuarioFilter.valueChanges.pipe(startWith('')),
    this.contenidoFilter.valueChanges.pipe(startWith('')),
    this.tipoLogFilter.valueChanges.pipe(startWith(''))]
  )
    .subscribe(([
      idLog,
      fecha,
      usuario,
      contenido,
      tipoLog
    ]) => {
      this.filterValues.id_log = idLog;
      this.filterValues.fecha = fecha;
      this.filterValues.usuario = usuario;
      this.filterValues.contenido = contenido;
      this.filterValues.tipo_log = tipoLog;
      this.dataSource.filter = JSON.stringify(this.filterValues);
  });
  }

}
