import { Component } from '@angular/core';
import { RecupMeteoService } from './services/recup-meteo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'climate-project-front';

  isLoaded = false;
  message: any;

  constructor(private meteoService: RecupMeteoService) {}

  ngOnInit(): void {
    this.meteoService.getMeteo().subscribe((rep: any) => {
      console.log(rep);
      this.message = rep;
      this.isLoaded = true;
    });
  }
}
