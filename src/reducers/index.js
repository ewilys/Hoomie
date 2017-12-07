import {combineReducers} from 'redux';
import { getItems, itemsAreLoading, itemsHaveErrored } from './ChartReducer';

export default combineReducers({
    getItems,
    itemsAreLoading,
    itemsHaveErrored
});
