import {combineReducers} from 'redux';
import { getTemperatures, temperaturesAreLoading, temperaturesHaveErrored } from './TemperatureReducer';

export default combineReducers({
    getTemperatures,
    temperaturesAreLoading,
    temperaturesHaveErrored
});
