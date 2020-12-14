import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Container, Button, Text, H1, Input, Form, Item, Toast} from 'native-base';

const Login = () => {
    return (
        <Container>
            <View>
                <H1>upTask</H1>
                <Form>
                    <Item inlineLabel last>
                        <Input
                            autoCompleteType="email"
                            placeholder="Email"
                        />
                    </Item>
                    <Item inlineLabel last>
                        <Input
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                    </Item>
                    <Button
                        square
                        block
                    >
                        <Text>Iniciar Sesión</Text>
                    </Button>

                    <Text>Crear Cuenta</Text>
                </Form>
            </View>
        </Container>
    )
}

export default Login;

const styles = StyleSheet.create({})
