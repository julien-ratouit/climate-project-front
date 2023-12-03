import { Component } from '@angular/core';
import { RecupDepartementService } from './services/recup-departement.service';
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
  selectedDepartement: string = "";

  constructor(private depService: RecupDepartementService) {}

  ngOnInit(): void {
    this.depService.loadDepartements().subscribe((result) => {
      this.isLoaded = result;
      if (result) {
        // La requête a réussi
        console.log('Données chargées avec succès !');
      } else {
        // Une erreur s'est produite
        console.error('Erreur lors du chargement des données.');
      }
    });
  }
}
