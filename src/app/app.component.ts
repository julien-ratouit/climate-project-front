import { Component } from '@angular/core';
import { RecupMeteoService } from './services/recup-meteo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'climate-project-front';

  isLoaded = false;
  message: any;
  selectedDate: string = "";
  selectedDepartement: string = ""

  constructor(private meteoService: RecupMeteoService) {}

  ngOnInit(): void {
    this.meteoService.getMeteo().subscribe((rep: any) => {
      console.log(rep);
      this.message = rep;
      this.isLoaded = true;
    });
  }

  initCarte(){
    // Sélectionnez tous les éléments avec l'attribut data-numerodepartement
    const elements = document.querySelectorAll("[data-numerodepartement]");
    console.log(elements);
    
    // Ajoutez un event listener à chaque élément
    elements.forEach(element => {
      element.addEventListener('click', (event) => {
        // Le code à exécuter lorsque l'élément est cliqué
        const numeroDepartement = element.getAttribute('data-numerodepartement');
        this.selectedDepartement = numeroDepartement?numeroDepartement:"choisissez en un";
        console.log(`Élément avec le numéro de département ${numeroDepartement} cliqué.`);
      });
    });
  }

  ngAfterViewInit() {
    this.initCarte();
  }


  onClick() {
    console.log();
    
  }
}
