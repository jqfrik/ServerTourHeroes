import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { Hero } from '../../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;
  @ViewChild('inputEl')
    inputEl!: ElementRef;
  constructor(private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }
  getHero():void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.heroService.getHero(id).subscribe(her => this.hero = her);
  }
  public changeHero(hero:Hero): void {
    hero.name = this.inputEl.nativeElement.value;
    this.heroService.updateHero(hero).subscribe(her => this.hero = her);
  }
  ngOnInit(): void {
    this.getHero();
  }

}
