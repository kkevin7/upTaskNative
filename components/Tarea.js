import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Text, ListItem, Left, Right, Icon, Toast} from 'native-base';
//Styles
import globalStyles from '../styles/global';

const Tarea = ({tarea}) => {
    return (
        <>
            <ListItem>
                <Left>
                    <Text>{tarea.nombre}</Text>
                </Left>
                <Right>
                    <Icon name="checkmark-circle"/>
                </Right>
            </ListItem>
        </>
    )
}

export default Tarea;

const styles = StyleSheet.create({});
