import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { GruposService } from '../services/grupos.service';
import { MatDialogMock } from '../shared/mock/MatDialogMock';
import { GruposServiceStub } from '../shared/stubs/gruposServiceStub';

import { GruposComponent } from './grupos.component';

describe('GruposComponent', () => {
  let component: GruposComponent;
  let fixture: ComponentFixture<GruposComponent>;
  let dialog: MatDialog;
  let gruposServiceStub: GruposServiceStub;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        CrudMaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [ GruposComponent ],
      providers: [
        {
          provide: GruposService,
          useClass: GruposServiceStub
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock
        },
        GruposServiceStub
      ]
    })
    .compileComponents();

    dialog = TestBed.inject(MatDialog);
    gruposServiceStub = TestBed.inject(GruposServiceStub);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getGrupos', async () => {
    await component.getGrupos();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('addGrupo', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getGrupos');
    await component.addGrupo();
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getGrupos).toHaveBeenCalled();
  });

  it('editGrupo', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getGrupos');
    await component.editGrupo(gruposServiceStub.getGrupo());
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getGrupos).toHaveBeenCalled();
  });

  it('deleteGrupo', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getGrupos');
    await component.deleteGrupo(gruposServiceStub.getGrupo());
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getGrupos).toHaveBeenCalled();
  });
});
