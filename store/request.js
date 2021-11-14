import axios from 'axios';

const API_URL = "http://api.alquran.cloud/v1/";

export const requestMeta = () => requestGet('meta')

export const requestSurah = (surahNumber) => requestGet(`surah/${surahNumber}/quran-uthmani`)

export const requestAyah = (ayahNumber) => 
    requestGet(`ayah/${ayahNumber}/editions/ar.abdurrahmaansudais,en.asad,id.indonesian`)
    .then(data => {
        const { audio, ...rest } = data[0];
        const { text: translation } = data[1];
        const { text: terjemah } = data[2];
        return { ...rest, audio, audioSecondary, translation, terjemah };
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