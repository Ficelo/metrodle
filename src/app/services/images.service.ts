import { Service } from '@angular/core';

export interface StationImage {
    title: string,
    thumbnail?: string,
    license?: string,
    artist?: string
}

@Service()
export class ImagesService {


    async getStationImage(stationName: string) {
        const params = new URLSearchParams({
            action: 'query',
            generator: 'search',
            gsrsearch: `${stationName} station Paris`,
            gsrnamespace: '6',
            gsrlimit: '10',
            prop: 'imageinfo',
            iiprop: 'url|extmetadata',
            iiurlwidth: '600',
            format: 'json',
            origin: '*'
        });

        const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);

        const data = await response.json();

        const images: StationImage[] = Object.values(data.query?.pages ?? {}).map((page: any) => ({
            title: page.title,
            thumbnail: page.imageinfo?.[0]?.thumburl,
            license: page.imageinfo?.[0]?.extmetadata?.LicenseShortName?.value,
            artist: page.imageinfo?.[0]?.extmetadata?.Artist?.value,
        }));

        console.log(images);
        return images;
    }


}
