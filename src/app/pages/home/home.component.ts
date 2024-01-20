import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Resultado } from 'src/app/interfaces/pokeapi';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private pokemonService : PokemonService){}
  @ViewChild('tarjetas') tarjetasElement!: ElementRef;

  listaPokemon:Resultado[] = []

  pagina:number = 1;
  cargando:boolean = false;

  ngOnInit(): void {
    this.cargarLista();
  }

  async cargarLista(){
    this.cargando=true;
    this.listaPokemon = [...this.listaPokemon, ...await this.pokemonService.getByPage(this.pagina)];
    this.cargando=false;
    this.pagina++;
  }

  onScroll(e:any){
    if(this.cargando) return;
    if(Math.round(
      this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
    ) === e.srcElement.scrollHeight){
      this.cargarLista();
    }
  }
}
