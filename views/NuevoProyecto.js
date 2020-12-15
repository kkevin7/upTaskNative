import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Button,
  Text,
  H1,
  Form,
  Item,
  Input,
  Toast,
} from 'native-base';
//Navigation
import {useNavigation} from '@react-navigation/native';
//Styles
import globalStyles from '../styles/global';
//Apollo
import {gql, useMutation} from '@apollo/client';

const NUEVO_PROYECTO = gql`
mutation nuevoProyecto($input: ProyectoInput){
    nuevoProyecto(input: $input){
        nombre,
        id
    }
}
`;

const NuevoProyecto = () => {
  //config
  const navigation = useNavigation();
  //Apollo
  const [nuevoProyecto] = useMutation(NUEVO_PROYECTO);
  //State
  const [mensaje, setMensaje] = useState(null);
  const [nombre, setNombre] = useState('');

  //Muestra un mensaje Toast
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  const handleSubmit = async () => {
    if (nombre === '') {
      setMensaje('El Nombre del proyecto es Obligatorio');
      return;
    }

    //Save data
    try {
        const {data} = await nuevoProyecto({
            variables: {
                input: {
                    nombre
                }
            }
        });
        setMensaje('Proyecto Creado Correctamente');
        navigation.navigate("Proyectos");
    } catch (error) {
        console.log("Error nuevoProyecto: ", error);
        setMensaje(error.message);
    }

    navigation.navigate('Proyectos');
  };

  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#E84347'}]}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.subtitulo}>Nuevo Proyecto</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Nombre del proyecto"
              onChangeText={(text) => setNombre(text.trim())}
            />
          </Item>
        </Form>

        <Button
          style={[globalStyles.boton, {marginTop: 30}]}
          square
          block
          onPress={() => handleSubmit()}>
          <Text style={globalStyles.botonTexto}>Crear Proyecto</Text>
        </Button>

        {mensaje && mostrarAlerta()}
      </View>
    </Container>
  );
};

export default NuevoProyecto;

const styles = StyleSheet.create({});
