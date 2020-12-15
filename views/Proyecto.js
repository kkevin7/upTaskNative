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

const Proyecto = ({route}) => {
  //State del componente
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  //Validar y crear tareas
  const handleSubmit = () => {
    if (nombre === '') {
      setMensaje('El nombre de la tarea es obligatorio');
    }

    setMensaje('');

    //Almacenarlo en la base de datos

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
              onChangeText={(text) => setNombre(text.trim())}
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
