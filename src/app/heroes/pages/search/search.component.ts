import { Component, OnInit } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroSelected!: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  searching(): void {
    this.heroesService
      .getSugerences(this.termino.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroSelected = undefined;
      return;
    }
    const hero: Heroe = event.option.value;
    this.termino = hero.superhero;
    this.heroesService
      .getHeroById(hero.id!)
      .subscribe((hero) => (this.heroSelected = hero));
  }

  ngOnInit(): void {}
}
