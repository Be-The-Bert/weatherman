import { buildURL, formatWeatherData } from '../utils/weatherUtils';
import axios from 'axios';

// TYPO PREVENTION
const RESET = "RESET";
const SET_WEATHER = "SET_WEATHER";



// DEFAULT STATE
const initialState = {
  error: false,
  loading: false,
  search: true,
  weather: {}
};




// REDUCER

export default function weather( state = initialState, action ) {
  switch ( action.type ) {
    case SET_WEATHER + '_PENDING': 
      return {
        error: false,
        loading: true,
        search: false,
        weather: {}
      };
    case SET_WEATHER + '_FULFILLED': 
      console.log('reducer', action.payload);
      return {
        error: false,
        loading: false,
        search: false,
        weather: action.payload
      }
    case SET_WEATHER + '_REJECTED': 
      return {
        error: true,
        loading: false,
        search: false,
        weather: {}
      }
    case RESET: return initialState;
    default: return state;
  }
}




// ACTIONS (ALWAYS RETURN AN OBJECT)

export function reset() {
  return { type: RESET };
}

export function setWeather(location) {
  var url = buildURL(location);
  var promise = axios.get(url).then( response => formatWeatherData(response.data) );
  console.log(promise);
  return {
    type: SET_WEATHER,
    payload: promise
  }
}