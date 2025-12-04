import {Component, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatButton} from '@angular/material/button';
import {RandomFightingPairDto} from './model/random-fighting-pair-dto';
import {PokemonDto} from './model/pokemon-dto.model';
import {PokemonCardComponent} from './pokemon-card/pokemon-card.component';
import {BattleDto} from './model/battle-dto.model';
import {MatIcon} from '@angular/material/icon';
import {finalize} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-battle',
  imports: [
    MatButton,
    PokemonCardComponent,
    MatIcon,
    MatProgressSpinner,

  ],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss',
})
export class BattleComponent {

  pokemon1: WritableSignal<PokemonDto | undefined> = signal<PokemonDto | undefined>(undefined);
  pokemon2: WritableSignal<PokemonDto | undefined> = signal<PokemonDto | undefined>(undefined);
  winner: WritableSignal<PokemonDto | undefined> = signal<PokemonDto | undefined>(undefined);
  loading: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private readonly http: HttpClient) {
  }

  onFightClicked() {
    this.http.get<RandomFightingPairDto>('/api/pokemons/random-fighting-pair').subscribe((randomFightingPairDto: RandomFightingPairDto) => {
      this.loading.set(true);
      this.pokemon1.set(randomFightingPairDto.pokemon1);
      this.pokemon2.set(randomFightingPairDto.pokemon2);

      this.http.post<BattleDto>('/api/battles', {
        pokemon1Name: this.pokemon1()?.name,
        pokemon2Name: this.pokemon2()?.name
      }).pipe(finalize(() => this.loading.set(false)))
        .subscribe(
        (battleDto: BattleDto) => this.winner.set(battleDto.winnerPokemon)
      )
    })
  }
}
