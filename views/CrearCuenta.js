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

const CrearCuenta = () => {
  //State del formlario
  const [nombre, setNombre] = useState('');
  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);

  //React Navigation
  const navigation = useNavigation();

  //Crear cuenta
  const handleSubmit = () => {
    //validar
    if(nombre == '' || email === '' || password === ''){
      //Mostrar un error
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    //passwrod al menos 6 caracteres
    if(password.length <6){
      setMensaje('El password debe ser de al menos 6 caracteres');
      return;
    }

    //save user


  }

  //Muestra un mensaje Toast
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 5000
    })
  }

  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#e84347'}]}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>UpTask</H1>
        <Form>
        <Item inlineLabel last style={globalStyles.input}>
            <Input  placeholder="Nombre" onChange={(text) => setNombre(text)} />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input autoCompleteType="email" placeholder="Email" onChange={(text) => setEmail(text)} />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input secureTextEntry={true} placeholder="Password" onChange={(text) => setPassword(text)} />
          </Item>
          <Button square block style={globalStyles.boton} onPress={() => handleSubmit()}>
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
