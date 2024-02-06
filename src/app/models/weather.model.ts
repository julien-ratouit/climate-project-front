export class Weather {
  apremidi: WeatherPeriod;
  departement: number;
  matin: WeatherPeriod;

  constructor(data: any) {
    this.apremidi = new WeatherPeriod(data['apremidi.humidite'], data['apremidi.pluie_1h'], data['apremidi.pluie_3h'], data['apremidi.pression'], data['apremidi.temperature'], data['apremidi.vent_direction'], data['apremidi.vent_moyen'], data['apremidi.vent_rafales']);
    this.departement = data['departement'];
    this.matin = new WeatherPeriod(data['matin.humidite'], data['matin.pluie_1h'], data['matin.pluie_3h'], data['matin.pression'], data['matin.temperature'], data['matin.vent_direction'], data['matin.vent_moyen'], data['matin.vent_rafales']);
  }
}

export class WeatherPeriod {
  humidite: number;
  pluie_1h: number;
  pluie_3h: number;
  pression: number;
  temperature: number;
  vent_direction: number;
  vent_moyen: number;
  vent_rafales: number;

  constructor(
    humidite: number,
    pluie_1h: number,
    pluie_3h: number,
    pression: number,
    temperature: number,
    vent_direction: number,
    vent_moyen: number,
    vent_rafales: number
  ) {
    this.humidite = humidite;
    this.pluie_1h = pluie_1h;
    this.pluie_3h = pluie_3h;
    this.pression = pression;
    this.temperature = temperature;
    this.vent_direction = vent_direction;
    this.vent_moyen = vent_moyen;
    this.vent_rafales = vent_rafales;
  }
}
