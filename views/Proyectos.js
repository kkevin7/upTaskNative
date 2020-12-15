import React, {useState, useCallback} from 'react';
import {StyleSheet, VirtualizedList, RefreshControl} from 'react-native';
import {
  Container,
  Button,
  Text,
  H2,
  Content,
  List,
  ListItem,
  Left,
  Right,
} from 'native-base';
//Navigation
import {useNavigation} from '@react-navigation/native';
//Styles
import globalStyles from '../styles/global';
import {gql, useQuery} from '@apollo/client';
//Components
import LoadingIndicator from '../components/LoadingIndicator';

const OBTENER_PROYECTOS = gql`
  query obtenerProyectos {
    obtenerProyectos {
      id
      nombre
    }
  }
`;

const Proyectos = () => {
  const navigation = useNavigation();
  //Apollo
  const {data, loading, error} = useQuery(OBTENER_PROYECTOS);
  //State
  const [refreshing, setRefreshing] = React.useState(false);

  if (loading) return <LoadingIndicator />;

  const reload = () => {
      
  }

  //   const onRefresh = React.useCallback(async () => {
  //     setRefreshing(true);
  //     await reload().then(() => setRefreshing(false));
  //   }, []);

  const getItemCount = (data) => data.length;
  const getItem = (data, index) => data[index];
  const renderItem = (proyecto) => {
    return (
      <ListItem
        key={proyecto.id}
        onPress={() => navigation.navigate('Proyecto', proyecto)}>
        <Left>
          <Text>{proyecto.nombre}</Text>
        </Left>
        <Right></Right>
      </ListItem>
    );
  };

  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#E84347'}]}>
      <Button
        style={[globalStyles.boton, {marginTop: 30}]}
        square
        block
        onPress={() => navigation.navigate('NuevoProyecto')}>
        <Text style={globalStyles.botonTexto}>Nuevo Proyecto</Text>
      </Button>

      <H2 style={globalStyles.subtitulo}>Selecciona un proyecto</H2>

      <List style={styles.contenido}>
        <VirtualizedList
          //
          data={data.obtenerProyectos}
          initialNumToRender={4}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
          //   refreshControl={
          //     <RefreshControl
          //       refreshing={refreshing}
          //       onRefresh={onRefresh}
          //       colors={['#28303B']}
          //     />
          //   }
        />
      </List>
    </Container>
  );
};

export default Proyectos;

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#FFF',
    marginHorizontal: '2.5%',
  },
});
