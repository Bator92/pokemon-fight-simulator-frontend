import {PokemonDto} from './pokemon-dto.model';

export interface BattleDto {
    uuid: string;
    winnerPokemon: PokemonDto;
    looserPokemon: PokemonDto;
    createdAt: string;
}
