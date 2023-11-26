import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { LogsService } from '../services/logs.service';
import { LogsServiceStub } from '../shared/stubs/logsServiceStub';

import { LogsComponent } from './logs.component';

describe('LogsComponent', () => {
  let component: LogsComponent;
  let fixture: ComponentFixture<LogsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        CrudMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ LogsComponent ],
      providers: [
        {
          provide: LogsService,
          useClass: LogsServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getLogs', async () => {
    await component.getLogs();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });
});
