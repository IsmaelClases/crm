import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { OpcionesService } from '../services/opciones.service';
import { MatDialogMock } from '../shared/mock/MatDialogMock';
import { OpcionesServiceStub } from '../shared/stubs/opcionesServiceStub';

import { OpcionesComponent } from './opciones.component';

describe('OpcionesComponent', () => {
  let component: OpcionesComponent;
  let fixture: ComponentFixture<OpcionesComponent>;
  let opcionesServiceStub: OpcionesServiceStub;
  let dialog: MatDialog;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        CrudMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ OpcionesComponent ],
      providers: [
        {
          provide: OpcionesService,
          useClass: OpcionesServiceStub
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock
        },
        OpcionesServiceStub
      ]
    })
    .compileComponents();

    opcionesServiceStub = TestBed.inject(OpcionesServiceStub);
    dialog = TestBed.inject(MatDialog);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getOpciones', async () => {
    await component.getOpciones();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('addOpcion', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getOpciones');
    await component.addOpcion();
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getOpciones).toHaveBeenCalled();
  });

  it('editOpcion', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getOpciones');
    await component.editOpcion(opcionesServiceStub.getOpcion());
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getOpciones).toHaveBeenCalled();
  });

  it('deleteOpcion', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getOpciones');
    await component.deleteOpcion(opcionesServiceStub.getOpcion());
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getOpciones).toHaveBeenCalled();
  });
});
