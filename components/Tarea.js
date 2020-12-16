import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, ListItem, Left, Right, Icon, Toast} from 'native-base';
//Styles
import globalStyles from '../styles/global';
//Apollo
import {gql, useMutation} from '@apollo/client';

const ACTUALIZAR_TAREA = gql`
  mutation actualizarTarea($id: ID!, $input: TareaInput, $estado: Boolean) {
    actualizarTarea(id: $id, input: $input, estado: $estado) {
      nombre
      id
      proyecto
      estado
    }
  }
`;

const Tarea = ({tarea}) => {
  const {id, nombre, estado} = tarea;
  //Apollo
  const [actualizarTarea] = useMutation(ACTUALIZAR_TAREA);

  const cambiarEstado = async () => {
    try {
      const {data} = await actualizarTarea({
        variables: {
          id,
          input: {
            nombre,
          },
          estado: !estado,
        },
      });
      console.log(data);
    } catch (error) {
      console.log('Actualizar Tarea: ', error);
    }
  };

  return (
    <>
      <ListItem onPress={() => cambiarEstado()}>
        <Left>
          <Text>{tarea.nombre}</Text>
        </Left>
        <Right>
          {tarea.estado ? (
            <Icon
              style={[styles.icono, styles.completo]}
              name="checkmark-circle"
            />
          ) : (
            <Icon
              style={[styles.icono, styles.incompleto]}
              name="checkmark-circle"
            />
          )}
        </Right>
      </ListItem>
    </>
  );
};

export default Tarea;

const styles = StyleSheet.create({
  icono: {
    fontSize: 32,
  },
  completo: {
    color: 'green',
  },
  incompleto: {
    color: '#E1E1E1',
  },
});
