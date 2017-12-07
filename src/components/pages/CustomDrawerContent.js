import React from 'react';
import {DrawerItems} from 'react-navigation';
import styled from 'styled-components/native';
import { Image } from 'react-native';

import Button from '../ui/Button';

const ContainerView = styled.View`
  flex: 1;
`;

const DrawerContainer = styled.View`
  flex: 8;
`;

const AvatarContainer = styled.View`
  flex: 4;
  alignItems: center;
  justifyContent: center;
`;

const ItemContainer = styled.View`
  flex: 6;
`;

const ButtonContainer = styled.View`
  flex: 2;
  justifyContent: center;
  alignItems: center;
`;

const CustomDrawerContent = (props) => (
    <ContainerView>
        <DrawerContainer>
            <AvatarContainer>
                <Image style={{width: 100, height: 100, borderRadius: 60}} source={require('../../../assets/images/High-Definition-Ultra-HD-Wallpaper-96262544.jpg')}/>
            </AvatarContainer>
            <ItemContainer>
                <DrawerItems {...props} />
            </ItemContainer>
        </DrawerContainer>
        <ButtonContainer>
            <Button text="Logout" onPress={() => props.navigation.navigate('Welcome')}/>
        </ButtonContainer>
    </ContainerView>
);

export default CustomDrawerContent;
