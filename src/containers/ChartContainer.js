/* eslint-disable arrow-body-style */
import { connect } from 'react-redux'
import { itemsFetchData } from '../actions'
import ChartView from "../components/ChartView";
import { SmoothLine } from 'react-native-pathjs-charts'

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.getItems,
        hasErrored: state.itemsHaveErrored,
        isLoading: state.itemsAreLoading,
        homeRefreshing: ownProps.homeRefreshing,
        chartType: SmoothLine
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getData: (subparameters) => dispatch(itemsFetchData(ownProps.fetchAddress)),
        homeRefreshed: ownProps.homeRefreshed
    }
};

const ChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartView);

export default ChartContainer