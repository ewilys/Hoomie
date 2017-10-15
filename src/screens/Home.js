import React, { Component } from 'react';
import styled from 'styled-components/native';
import TemperatureView from "../components/TemperatureView";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

class HomeScreen extends Component {
  render() {
    return (
      <ContainerView>
        <TemperatureView/>
      </ContainerView>
    );
  }
}

export default HomeScreen;
