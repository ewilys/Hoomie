import React from 'react';
import {DrawerItems} from 'react-navigation';
import styled from 'styled-components/native';
import { Image,Text,View } from 'react-native';

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

const ViewContainer = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;


const CustomDrawerContent = (props) => (
    <ContainerView>
        <DrawerContainer>

            <AvatarContainer>
                {props.univ ?
                    <Image style={{width: 100, height: 100, borderRadius: 60}} source={require('../../../assets/images/university.png')}/>
                    :
                    <Image style={{width: 100, height: 100, borderRadius: 60}} source={require('../../../assets/images/student.jpg')}/>
                }
            </AvatarContainer>
            <ViewContainer>
                {props.univ ?
                    <Text> DirPat Insa Lyon </Text>
                    :
                    <Text> Michelle Grande, room 204 </Text>
                }
            </ViewContainer>
            <ItemContainer>
                <DrawerItems {...props} />
            </ItemContainer>
        </DrawerContainer>
        <ButtonContainer>
            {props.univ ?
                <Button text="Switch to Student Account" onPress={() => props.navigation.navigate('StudStack')}/>
                :
                <Button text="Switch to University Account" onPress={() => props.navigation.navigate('UnivStack')}/>
            }
        </ButtonContainer>
    </ContainerView>
);

export default CustomDrawerContent;
