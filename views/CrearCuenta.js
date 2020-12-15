import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Form,
  Item,
  Toast,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
//Styles
import globalStyles from '../styles/global';
//Apollo
import {gql, useMutation} from '@apollo/client';

const NUEVA_CUENTA = gql`
  mutation crearUsuario($input: UsuarioInput) {
    crearUsuario(input: $input)
  }
`;

const CrearCuenta = () => {
  //React Navigation
  const navigation = useNavigation();
  // Mutation de apollo
  const [crearUsuario] = useMutation(NUEVA_CUENTA);
  //State del formlario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);

  //Crear cuenta
  const handleSubmit = async () => {
    // validar
    if (nombre === '' || email === '' || password === '') {
      //Mostrar un error
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    //passwrod al menos 6 caracteres
    if (password.length < 6) {
      setMensaje('El password debe ser de al menos 6 caracteres');
      return;
    }

    //save user
    try {
      const {data} = await crearUsuario({
        variables: {
          input: {
            nombre,
            email,
            password,
          }
        }
      });
      setMensaje(data.crearUsuario);
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error crearUsuario: ', error);
      setMensaje(error.message.replace('GraphQL error', ''));
    }
  };

  //Muestra un mensaje Toast
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#e84347'}]}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>UpTask</H1>
        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input placeholder="Nombre" onChangeText={(text) => setNombre(text)} />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              autoCompleteType="email"
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </Item>
          <Button
            square
            block
            style={globalStyles.boton}
            onPress={() => handleSubmit()}>
            <Text style={globalStyles.botonTexto}>Registrarse</Text>
          </Button>
          {mensaje && mostrarAlerta()}
        </Form>
      </View>
    </Container>
  );
};

export default CrearCuenta;

const styles = StyleSheet.create({});
