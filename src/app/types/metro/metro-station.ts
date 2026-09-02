export interface StationMetro {
    name: string;
    town: string;
    accessibility?: boolean;
    audibleSignels?: boolean;
    lines: string[];
    openingDate: string;
    coords: {
        lon: number;
        lat: number;
    };
}