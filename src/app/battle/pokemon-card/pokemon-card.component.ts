import {Component, input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {PokemonDto} from '../model/pokemon-dto.model';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardImage
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {

  pokemon = input<PokemonDto | undefined>();

}
