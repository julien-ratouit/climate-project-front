import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RecupMeteoService } from 'src/app/services/recup-meteo.service';
import Chart, { ChartItem } from 'chart.js/auto';
import { catchError } from 'rxjs';
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

  constructor(private meteoService: RecupMeteoService) {}

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

  private makePrediction(){
    this.meteoService.getMeteoPrediction(Number(this.dep), this.annee).subscribe((res: any) => {
      console.log(res);
      
    });
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
        borderColor: 'rgb(75, 192, 192)',
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
