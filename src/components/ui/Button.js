import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableHighlight`
  height: 50;
  width: 280;
  backgroundColor: ${props=> props.theme.HOOMIE_100};
  borderRadius: 5;
  justifyContent: center;
  alignItems: center;
`;

const Text = styled.Text`
  fontSize: 20;
  color: ${props => props.theme.WHITE};
`;

class Button extends Component {
  render() {
    const { text, onPress, theme } = this.props;

    return (
      <ButtonContainer
        underlayColor={theme.HOOMIE_200}
        onPress={onPress}
      >
        <Text>{text}</Text>
      </ButtonContainer>
    );
  }
}

export default withTheme(Button);
