/* eslint-disable arrow-body-style */
import { connect } from 'react-redux'
import { itemsFetchData } from '../actions'
import TemperatureView from "../components/TemperatureView";

const mapStateToProps = state => {
    return {
        items: state.getItems,
        hasErrored: state.itemsHaveErrored,
        isLoading: state.itemsAreLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getLast: (subparameters) => dispatch(itemsFetchData('/temperature/last'))
    }
};

const TemperatureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemperatureView);

export default TemperatureContainer