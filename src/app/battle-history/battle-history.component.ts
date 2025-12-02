import {Component, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import {BattleDto} from '../battle/model/battle-dto.model';

@Component({
  selector: 'app-battle-history',
  imports: [
    MatInput,
    MatLabel,
    MatHeaderCellDef,
    MatTable,
    MatFormField,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatButton,
    MatRowDef,
    MatHeaderRowDef,
    MatNoDataRow
  ],
  templateUrl: './battle-history.component.html',
  styleUrl: './battle-history.component.css',
})
export class BattleHistoryComponent implements OnInit {
  displayedColumns: string[] = ['winnerName', 'winnerType', 'winnerPower', 'looserName', 'looserType', 'looserPower'];
  dataSource = new MatTableDataSource<BattleDto>([]);

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.getFilterPredicate()
    this.loadData();
  }

  private getFilterPredicate() {
    return (data: BattleDto, filter: string) => {
      return data.looserPokemon.name.toLowerCase().includes(filter)
        || data.looserPokemon.type.toLowerCase().includes(filter)
        || data.looserPokemon.power.toString().includes(filter)
        || data.winnerPokemon.name.toLowerCase().includes(filter)
        || data.winnerPokemon.type.toLowerCase().includes(filter)
        || data.winnerPokemon.power.toString().includes(filter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRefreshClicked() {
    this.loadData();
  }

  private loadData() {
    this.http.get<BattleDto[]>('/api/battles', {params: {'limit': 20}}).subscribe(battles => {
      this.dataSource.data = battles.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    });

  }
}
