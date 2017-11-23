/* eslint-disable arrow-body-style */
import { connect } from 'react-redux'
import { itemsFetchData } from '../actions'
import ChartView from "../components/ChartView";
import { SmoothLine } from 'react-native-pathjs-charts'
import { getCurrentYear } from "../utils/methods";

const mapStateToProps = state => {
    return {
        items: state.getItems,
        hasErrored: state.itemsHaveErrored,
        isLoading: state.itemsAreLoading,
        chartType: SmoothLine
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentYear: (subparameters) => dispatch(itemsFetchData('/temperature/year/'+getCurrentYear()))
    }
};

const ChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartView);

export default ChartContainer