/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import styled from 'styled-components/native';
import TemperatureContainer from "../containers/TemperatureContainer";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

class HomeScreen extends Component {
    render() {
        return (
            <ContainerView>
                <TemperatureContainer/>
            </ContainerView>
        );
    }
}

export default HomeScreen;
