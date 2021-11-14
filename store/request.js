import axios from 'axios';

const API_URL = "http://api.alquran.cloud/v1/";

export const requestMeta = () => requestGet('meta')

export const requestSurah = (surahNumber, page, size = 20) => 
    requestGet(`surah/${surahNumber}/quran-uthmani${page ? `?offset=${page * size}&limit=${size}` : null}`)

export const requestAyah = (ayahNumber) => 
    requestGet(`ayah/${ayahNumber}/editions/en.asad,id.indonesian,ar.abdurrahmaansudais,ar.saoodshuraym,ar.muhammadayyoub,ar.aymanswoaid`)
    .then(data => {
        const [translation, terjemah, ...audios] = data;
        const qori = audios.map(({ edition, audio, audioSecondary }) => ({
            ...edition,
            audio,
            audioSecondary
        })) 
        return { 
            ...audios[0], 
            translation: translation.text, 
            terjemah: terjemah.text,
            qori
        };
    })

const requestGet = (url, params, options = {}) =>
	axios.get(API_URL + url, {
        params,
        ...options
    })
    .then(res => res.data)
    .then(res => {
        if (res.code === 200) {
            return res.data;
        } else {
            console.log("err", res);
            throw 'failed';
        }
    })