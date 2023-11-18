import { Component } from '@angular/core';
import { Departement } from 'src/app/models/departement';
import { RecupDepartementService } from 'src/app/services/recup-departement.service';

@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.css']
})
export class PagePrincipaleComponent {
  isLoaded = false;
  listDepartement: Departement[] = this.depService.getDepartements();
  selectedDate: string = "";
  selectedDepartement: string = ""

  constructor(private depService: RecupDepartementService) {}

  ngOnInit(): void {
  }

  initCarte(){
    // Sélectionnez tous les éléments avec l'attribut data-numerodepartement
    const elements = document.querySelectorAll("[data-numerodepartement]");
    
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
