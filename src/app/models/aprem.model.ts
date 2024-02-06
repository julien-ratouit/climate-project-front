// aprem.model.ts
export interface Aprem {
    conditions: {
        humidity_max: number;
        rainfall_max: number;
        temperature_min: number;
        wind_speed_max: number;
    };
    departement: string;
    latitude: number;
    longitude: number;
    name: string;
    type: string;
}