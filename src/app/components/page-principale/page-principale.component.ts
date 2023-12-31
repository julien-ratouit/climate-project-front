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
  selectedDepartement!: Departement;
  svgDepartement!: Element;

  constructor(private depService: RecupDepartementService) {
    this.selectedDepartement = this.listDepartement.at(1)!;
  }

  ngOnInit(): void {
  }

  initCarte(){
    // Sélectionnez tous les éléments avec l'attribut data-numerodepartement
    const elements = document.querySelectorAll("[data-numerodepartement]");
    const select = document.querySelector("#departementSelect");
    this.svgDepartement = document.querySelector("[data-numerodepartement='"+this.selectedDepartement.num+"']")!;
    
    // Ajoutez un event listener à chaque élément
    elements.forEach(element => {
      element.addEventListener('click', (event) => {
        // Le code à exécuter lorsque l'élément est cliqué
        const numeroDepartement = element.getAttribute('data-numerodepartement');
        console.log(`Élément avec le numéro de département ${numeroDepartement} cliqué.`);
        this.selectedDepartement = this.listDepartement.find(dep => dep.num.toString() == numeroDepartement)!;
        this.changeCouleur(element);
      });
    });
  }

  ngAfterViewInit() {
    this.initCarte();
  }

  changeCouleurDepuisSelect(event: Departement){ 
    const element = document.querySelector("[data-numerodepartement='"+event.num+"']");
    this.changeCouleur(element!);
  }

  changeCouleur(element: Element){ 
    this.svgDepartement.setAttribute("class", "");
    this.svgDepartement = element;
    this.svgDepartement.setAttribute("class", "selectedDep");
  }

  onClick() {
    console.log();
    document.getElementById("transition")!.style.display = "block";
    document.getElementById("contenue")!.classList.add("animate-contenue");
  }
}
