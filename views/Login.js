import React, {useState} from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';

const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput){
  autenticarUsuario(input: $input){
    token
  }
}
`;

const Login = () => {
  //React Navigation
  const navigation = useNavigation();
  // Mutation de apollo
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
  //State del formlario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);

  //Muestra un mensaje Toast
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  //Cuando el usuariop presiona en iniciar sesion
  const handleSubmit = async () => {
    // validar
    if (email === '' || password === '') {
      //Mostrar un error
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    //passwrod al menos 6 caracteres
    if (password.length < 6) {
      setMensaje('El password debe ser de al menos 6 caracteres');
      return;
    }

    try {
      const {data} = await autenticarUsuario({
        variables: {
          input: {
            email,
            password,
          }
        }
      });
      const {token} = data.autenticarUsuario;
      //Coloar token en storage
      await AsyncStorage.setItem('token', token);
      //Redireccionar a Proyectos
      navigation.navigate("Proyectos");

    } catch (error) {
      console.log("Login Error: ",error);
      setMensaje(error.message.replace('GraphQL error', ''));
    }

  };

  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#e84347'}]}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>UpTask</H1>
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
          <Text style={globalStyles.botonTexto}>Iniciar Sesión</Text>
        </Button>

        <Text
          style={globalStyles.enlace}
          onPress={() => navigation.navigate('CrearCuenta')}>
          Crear Cuenta
        </Text>

        {mensaje && mostrarAlerta()}
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({});
