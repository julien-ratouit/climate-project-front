import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RecupMeteoService } from 'src/app/services/recup-meteo.service';
import Chart, { ChartItem } from 'chart.js/auto';
import { catchError } from 'rxjs';
import { Weather } from 'src/app/models/weather.model';
import { Aprem } from 'src/app/models/aprem.model';
import { Matin } from 'src/app/models/matin.model';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnChanges, OnInit {
  @Input() annee: string = '2024-01-01';
  @Input() dep: number = 72;
  anneeDate!: Date;
  temperaturesApremidi: number[] = [];
  dates: string[] = [];
  data: any;
  weatherData!: Weather;
  apremList: Aprem[] = []; // Liste des objets "aprem"
  matinList: Matin[] = []; // Liste des objets "matin"
  showAprem: boolean = false; // Indicateur pour afficher les données de l'après-midi ou du matin
  dataList: (Aprem | Matin)[] = []; // Liste des données à afficher
  showAll: boolean = false;
  @Input()chart: boolean = true;

  constructor(private meteoService: RecupMeteoService) {
    Chart.defaults.color = '#FFF';
  }

  ngOnInit() {
    this.handleAnneeChange();
    const ctx = document.getElementById('myChart');
    if (ctx) {
      new Chart(ctx as ChartItem, {
        type: 'line',
        data: this.data,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);

    if (changes['annee'] || changes['dep']) {
      if(changes['annee']){
        const newAnnee = this.convertStringToDate(changes['annee'].currentValue);
        if (newAnnee instanceof Date) {
          this.anneeDate = newAnnee;
        } else {
          console.error('Invalid date format for annee:', newAnnee);
        }
      }
      if(changes['dep']){
        const newDep = changes['dep'].currentValue;
        this.dep = newDep;
      }
      this.handleAnneeChange();
      this.makePrediction();
    }
  }

      // Fonction pour convertir la valeur de pluie en texte descriptif
      getRainDescription(value: number): string {
        if (value === 0) {
            return "Pas de pluie";
        } else if (value < 5) {
            return "Un peu de pluie";
        } else {
            return "Très pluvieux";
        }
    }

    // Fonction pour arrondir la température à l'entier et ajouter le symbole °C
    formatTemperature(value: number): string {
        return Math.round(value) + "°C";
    }

    // Fonction pour convertir la valeur du vent moyen en texte descriptif
    getWindDescription(value: number): string {
        if (value === 0) {
            return "Pas de vent";
        } else if (value < 10) {
            return "Vent faible";
        } else {
            return "Vent fort";
        }
    }

  private makePrediction(){
    this.meteoService.getMeteoPrediction(Number(this.dep), this.annee).subscribe((res: any) => {
      this.weatherData = new Weather(res);
      console.log(res);
      this.getActivities(res);
    });
  }

  private getActivities(json: JSON){
    this.meteoService.getActivities(json).subscribe((res: any) => {
      console.log(res);
      this.apremList = res.aprem;
      this.matinList = res.matin;
      this.dataList = this.matinList;
    });

  }

  toggleDataList() {
    this.showAprem = !this.showAprem; // Basculer entre l'affichage des données du matin et de l'après-midi
    this.dataList = this.showAprem ? this.apremList : this.matinList; // Mettre à jour la liste affichée
  }

  expendDataList() {
    this.showAll = !this.showAll; // Basculer entre l'affichage de toutes les données ou seulement les cinq premières
  }

  private handleAnneeChange() {
    console.log('Init', this.anneeDate);
    const year = this.anneeDate.getFullYear();

    this.meteoService.getMeteoDepAnnee(Number(this.dep), year).subscribe(res => {
      this.temperaturesApremidi = [];
      this.dates = [];

      res.forEach((item) => {
        if (item.apremidi && item.date) {
          const temperatureApremidi = item.apremidi.temperature;
          const date = this.convertStringToDate(item.date)?.toLocaleDateString();
          this.temperaturesApremidi.push(temperatureApremidi);
          this.dates.push(date!);
        }
      });

      this.renderChart();
    });
  }

  private renderChart() {
    const labels = this.dates;
    this.data = {
      labels: labels,
      datasets: [{
        label: 'temperature sur l\'année ' + this.anneeDate.getFullYear() + ' dans le ' + this.dep,
        data: this.temperaturesApremidi,
        fill: false,
        borderColor: 'rgb(255, 255, 255)',
        tension: 0.1
      }]
    };

    const ctx = document.getElementById('myChart');
    if (ctx) {
      const existingChart = Chart.getChart(ctx as HTMLCanvasElement);
      if (existingChart) {
        existingChart.destroy();
      }
    }
    if (ctx) {
      new Chart(ctx as ChartItem, {
        type: 'line',
        data: this.data,
      });
    }
  }
      

  private convertStringToDate(dateString: string): Date | null {
    const dateParts = dateString.split('-').map(Number);
  
    // Validate if the string has three parts (year, month, day) and each part is a number
    if (dateParts.length === 3 && dateParts.every(part => !isNaN(part))) {
      const [year, month, day] = dateParts;
      
      // Month is 0-based in JavaScript Date object, so subtract 1 from the month
      const convertedDate = new Date(year, month - 1, day);
  
      // Check if the conversion was successful
      if (!isNaN(convertedDate.getTime())) {
        return convertedDate;
      }
    }
  
    console.error('Invalid date format:', dateString);
    return null;
  }
}
