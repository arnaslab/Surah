import { combineReducers } from 'redux';
import meta from './meta';
import surah from './surah';
import ayah from './ayah';

export default combineReducers({
    meta,
    surah,
    ayah
})