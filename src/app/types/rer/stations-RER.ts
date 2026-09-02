export interface StationRER {
    name: string;
    town: string;
    liens: string[];
    zone: string;
    situation: string;
    coords: {
        lon: number;
        lat: number;
    };
    openingDate: string;
    url: string;

}