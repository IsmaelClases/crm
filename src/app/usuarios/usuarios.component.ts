import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
import { Usuario } from '../shared/interfaces/usuario';
import { Permises } from '../shared/interfaces/api-response';
// import { fadeOut, blub} from '../animations/animation';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  // animations: [fadeOut, blub],
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  permises: Permises;


  idFilter = new FormControl();
  usuarioFilter = new FormControl();
  nombreFilter = new FormControl();
  rolFilter = new FormControl();

  displayTable = false;

  displayedColumns: string[];
  private filterValues = { id_usuario: '', usuario: '', nombre_publico: '', rol: '', habilitado: 0 };


  constructor(
              public dialog: MatDialog,
              private servicioUsuarios: UsuarioService,
              private overlay: Overlay
              ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    const RESPONSE = await this.servicioUsuarios.getAllUsuarios().toPromise();
    this.permises = RESPONSE.permises;
    if (RESPONSE.ok) {
      this.displayedColumns = ['id_usuario', 'usuario', 'nombre_publico', 'rol', 'habilitado', 'actions'];
      this.servicioUsuarios.usuarios = RESPONSE.data as Usuario[];
      this.dataSource.data = this.servicioUsuarios.usuarios;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }
  }

  async addUsuario() {
    const dialogRef = this.dialog.open(AddUsuarioComponent, { width: '500px', scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.servicioUsuarios.usuarios.push(RESP.data);
        this.dataSource.data = this.servicioUsuarios.usuarios;
      }
    }
  }

  async editUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      data: usuario,
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.servicioUsuarios.updateUsuario(RESP.data);
        this.dataSource.data = this.servicioUsuarios.usuarios;
      }
    }
  }

  async deleteUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(DeleteUsuarioComponent, { data: usuario, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.servicioUsuarios.removeUsuario(RESP.data);
        this.dataSource.data = this.servicioUsuarios.usuarios;
      }
    }
  }

  createFilter(): (usuario: any, filter: string) => boolean {
    const filterFunction = (usuario: any, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);

        return usuario.id_usuario.toString().indexOf(searchTerms.id_usuario.toLowerCase()) !== -1
            && usuario.usuario.toLowerCase().indexOf(searchTerms.usuario.toLowerCase()) !== -1
            && usuario.nombre_publico.toLowerCase().indexOf(searchTerms.nombre_publico.toLowerCase()) !== -1
            && usuario.rol.toLowerCase().indexOf(searchTerms.rol.toLowerCase()) !== -1
            && searchTerms.habilitado === 'todos' ? usuario.habilitado : usuario.habilitado.indexOf(searchTerms.habilitado) !== -1;
    };

    return filterFunction;
  }

  onChanges(): void {
    this.idFilter.valueChanges
        .subscribe(value => {
            this.filterValues.id_usuario = value;
            this.dataSource.filter = JSON.stringify(this.filterValues);
        });

    this.usuarioFilter.valueChanges
        .subscribe(value => {
            this.filterValues.usuario = value;
            this.dataSource.filter = JSON.stringify(this.filterValues);
        });

    this.nombreFilter.valueChanges
        .subscribe(value => {
            this.filterValues.nombre_publico = value;
            this.dataSource.filter = JSON.stringify(this.filterValues);
        });

    this.rolFilter.valueChanges
      .subscribe(value => {
          this.filterValues.rol = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

    }

    buscarHabilitados(event) {

      let value: number;

      event.value === 'todos' ? value = event.value : value = Number(event.value);
      this.filterValues.habilitado = value;
      // console.log(value);
      this.dataSource.filter = JSON.stringify(this.filterValues);
      // this.dataSource.data = this.dataSource.filteredData.filter(filas=> filas.habilitado == event.value)
    }
}
