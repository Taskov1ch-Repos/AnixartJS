/**
 * Парсер различных источников
 */

/**
 * KodikParser
 * Парсер источника Kodik
 * Большая часть кода основана на KodikWrapper (https://github.com/thedvxchsquad/kodikwrapper/blob/master/src/video-links.ts)
 */

/**
 * Качество
 */
export type KodikQuality = '240' | '360' | '480' | '720' | '1080' | string;

export interface KodikVideoSource {
    src: string,
    type: string
}

export type KodikVideoLinks = Record<KodikQuality, KodikVideoSource[]>;

export interface KodikVast {
    title_small: string,
    src: string,
    timer?: number,
    hide_interface?: boolean,
    async_load?: boolean,
    vpaid_target_event?: string,
    vpaid_max_load_time?: number,
    vpaid_max_start_time?: number,
    vpaid_start_event?: string,
    vpaid_timer_start_event?: string,
    vpaid_ad_skippable_state?: boolean,
    advert_id?: string,
    save_views?: boolean,
    start_muted?: boolean,
    max_length?: number,
    disable_advert_click?: number,
    send_stat_method?: string,
    stop_timer_on_pause?: boolean,
}

export interface KodikDirectLinkResponse {
    advert_script: string,
    domain: string,
    default: number,
    links: KodikVideoLinks,
    vast: KodikVast[],
    reserve_vast: KodikVast[],
    ip: string
}

export class KodikParser {
    private static _baseKodikDomain = 'kodik.info'
    private static _endpointUrl = '/ftor';

    public static async getLatestLink(url: string): Promise<string | null> {
        const endpointUrlRegex = new RegExp(/url:atob\(\"(?<encodedPath>[^"]+)\"\)/is);
        const appPlayerPathRegex = new RegExp(/src="(?<path>\/assets\/js\/app\.player_single\..*?\.js)"\>/is);

        const playerResponse = await (await fetch(url)).text();
        const appPlayerPath = playerResponse.match(appPlayerPathRegex)?.groups?.path;

        if (!appPlayerPath) return null;

        const appPlayerResponse = await (await fetch(`https://${new URL(url).host}${appPlayerPath}`)).text();
        const latestEndpoint = appPlayerResponse.match(endpointUrlRegex)?.groups?.encodedPath;

        if (!latestEndpoint) return null;

        return atob(latestEndpoint);
    }

    public static async getDirectLinks(url: string, endpointPath: string = this._endpointUrl): Promise<KodikVideoLinks | null> {
        const urlResponse = await (await fetch(url)).text();

        const urlParams = JSON.parse(urlResponse.match(/var\surlParams\s=\s'(?<params>.*?)';/is)?.groups?.params ?? "{}");
        const videoInfoHash = urlResponse.match(/videoInfo.hash\s=\s'(?<hash>.*?)';/is)?.groups?.hash;
        const videoInfoId = urlResponse.match(/videoInfo.id\s=\s'(?<id>.*?)';/is)?.groups?.id;
        const videoInfoType = urlResponse.match(/videoInfo.type\s=\s'(?<type>.*?)';/)?.groups?.type;
        const validKodikUrl = new RegExp(/\/\/(get|cloud)\.kodik-storage\.com\/useruploads\/.*?\/.*?\/(240|360|480|720|1080)\.mp4:hls:manifest.m3u8/s);

        if (!videoInfoHash || !videoInfoId || !videoInfoType) return null;

        const requestBody = {
            ...urlParams,
            type: videoInfoType,
            hash: videoInfoHash,
            id: videoInfoId
        }

        const directLinksResponse = await fetch(`https://${this._baseKodikDomain}${endpointPath}?${new URLSearchParams(requestBody).toString()}`, {
            referrer: '',
            referrerPolicy: "no-referrer"
        })
        if (directLinksResponse.headers.get("content-type") !== "application/json") return null;

        const directLinks: KodikDirectLinkResponse = await directLinksResponse.json();
        const zCharCode = 'Z'.charCodeAt(0);

        for (const [, sources] of Object.entries(directLinks.links)) {
          for (const source of sources) {
            if (validKodikUrl.test(source.src)) continue;

            const decryptedBase64 = source.src.replace(/[a-zA-Z]/g, e => {
                let eCharCode = e.charCodeAt(0);
                return String.fromCharCode((eCharCode <= zCharCode ? 90 : 122) >= (eCharCode = eCharCode + 18) ? eCharCode : eCharCode - 26);
              });
            source.src = atob(decryptedBase64);
          }
        }

        return directLinks.links;
    }
}


/** 
 * AniLibriaParser
 * Парсер источника Libria
 */

/**
 * Полученный обьект Файлов
 */
export interface AniLibriaFile {
    id: string,
    skip: boolean,
    file: string,
    title: string,
    poster: string,
    download: string
}

/**
 * Ссылка на файл
 */
export interface AniLibriaLink {
    quality: string,
    url: string
}

/**
 * Обьект файла
 */
export interface AniLibriaFileObject {
    id: string,
    skip: boolean,
    file: AniLibriaLink[],
    title: string,
    poster: string,
    download: string
}

/**
 * Возвращаемый обьект
 */
export interface AniLibriaReturnObject {
    files: AniLibriaFileObject[]
}

/**
 * Класс парсера анилибрии
 */
export class AniLibriaParser {
    private static _baseAniLibriaDomain = 'anixart.libria.fun'
    private static _endpointUrl = '/public/iframe.php'

    public static settingsPattern = new RegExp(/\[{.*?}\]/g);
    public static filesPattern =  new RegExp(/\[.*?\].*?(,|isAuthorized=\d)/g)

    public static async getDirectLinks(link: string): Promise<AniLibriaReturnObject | null> {
        const request = await fetch(link);

        let body = await request.text();
        let match = this.settingsPattern.exec(body);

        if (match) {
            let originalObject: AniLibriaFile[] = JSON.parse(match[0]);

            let returnedObject: AniLibriaReturnObject = {
                files: [],
            }

            for (let x of originalObject) {
                let res: AniLibriaFileObject = {
                    ...x,
                    file: []
                }
        
                let filesMatch = x.file.match(this.filesPattern);

                for (let y of filesMatch!) {
                    let link = y.replace('[', '').split(']');

                    res.file.push({quality: link[0], url: link[1]});
                }

                returnedObject.files.push(res);
            }

            return returnedObject;
        }

        return null;
    }
}

/** 
 * SibnetParser
 * Парсер источника Sibnet
 */
export class SibnetParser {
    private static _baseSibnetDomain = 'video.sibnet.ru';

    public static srcMatch = new RegExp(/src: (".*?")/g);

    public static async getDirectLink(link: string): Promise<string | null> {
        const request = await fetch(link);

        let body = await request.text();
        let match = this.srcMatch.exec(body);

        if (match) {
            const srcRequest = await fetch(`https://${this._baseSibnetDomain}${match[1].replace(/"/g, '')}`, {
                headers: {
                    host: this._baseSibnetDomain,
                    referer: link
                }
            });

            return srcRequest.url ?? null;
        }

        return null;
    }
}
