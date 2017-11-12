import {combineReducers} from 'redux';
import { getItems, itemsAreLoading, itemsHaveErrored } from './TemperatureReducer';

export default combineReducers({
    getItems,
    itemsAreLoading,
    itemsHaveErrored
});
