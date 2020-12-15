import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Button,
  Text,
  H2,
  Content,
  List,
  Form,
  Item,
  Input,
  Toast,
} from 'native-base';
// Styles
import globalStyles from '../styles/global';
import {gql, useMutation} from '@apollo/client';

const NUEVA_TAREA = gql`
  mutation nuevaTarea($input: TareaInput) {
    nuevaTarea(input: $input) {
      nombre
      id
      proyecto
      estado
    }
  }
`;

const Proyecto = ({route}) => {
  //Apollo
  const [nuevaTarea] = useMutation(NUEVA_TAREA);
  //State del componente
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  //Validar y crear tareas
  const handleSubmit = async () => {
    if (nombre === '') {
      setMensaje('El nombre de la tarea es obligatorio');
    }

    //Almacenarlo en la base de datos
    try {
      const {data} = await nuevaTarea({
        variables: {
          input: {
            nombre,
            proyecto: route.params.id,
          },
        },
      });
      setMensaje('Tarea Creada Correctamente');

      setTimeout(() => {
        setMensaje(null);
      }, 3000)
    } catch (error) {
      console.log('Error nuevaTarea: ', error);
      setMensaje(error.message);
    }
  };

  const mostrarAlerta = () => {
    if (mensaje) {
      Toast.show({
        text: mensaje,
        buttonText: 'OK',
        duration: 5000,
      });
    }
  };

  return (
    <Container
      style={([globalStyles.contenedor], {backgroundColor: '#e84347'})}>
      <View style={globalStyles.contenido}>
        <Form style={{marginHorizontal: '2.5%', marginTop: 20}}>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Nombre Tarea"
              value={nombre}
              onChangeText={(text) => setNombre(text)}
            />
          </Item>
        </Form>

        <Button
          style={globalStyles.boton}
          square
          block
          onPress={() => handleSubmit()}>
          <Text>Crear Tarea</Text>
        </Button>

        {mostrarAlerta()}
      </View>
    </Container>
  );
};

export default Proyecto;

const styles = StyleSheet.create({});
