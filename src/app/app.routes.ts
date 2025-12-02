import { Routes } from '@angular/router';
import { BattleComponent } from './battle/battle.component';
import { BattleHistoryComponent } from './battle-history/battle-history.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'battle' },
  { path: 'battle', component: BattleComponent },
  { path: 'history', component: BattleHistoryComponent },
  { path: '**', redirectTo: 'battle' }
];
