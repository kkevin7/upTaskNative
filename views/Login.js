import React from 'react';
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
//Styles
import globalStyles from '../styles/global';

const Login = () => {
  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#e84347'}]}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>UpTask</H1>
        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input autoCompleteType="email" placeholder="Email" />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input secureTextEntry={true} placeholder="Password" />
          </Item>
          <Button square block style={globalStyles.boton}>
            <Text style={globalStyles.botonTexto}>Iniciar Sesión</Text>
          </Button>

          <Text style={globalStyles.enlace}>Crear Cuenta</Text>
        </Form>
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({});
