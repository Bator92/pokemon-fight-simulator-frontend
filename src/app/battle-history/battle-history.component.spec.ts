import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleHistoryComponent } from './battle-history.component';

describe('BattleHistory', () => {
  let component: BattleHistoryComponent;
  let fixture: ComponentFixture<BattleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleHistoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
