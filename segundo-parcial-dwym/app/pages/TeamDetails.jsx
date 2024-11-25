import { Text, StyleSheet, View, ActivityIndicator, ScrollView, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { getEquipoById, deleteEquipo } from '../api';
import { Stack, useLocalSearchParams } from 'expo-router';
import TeamCard from '../components/TeamCard';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const TeamDetails = () => {
    const params = useLocalSearchParams();
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchTeam = async () => {
            setLoading(true);
            const response = await getEquipoById(params.id);
            setTeam(response);
            setLoading(false);
        };

        // Esto es para que cuando vuelva del form de editar le vuelva a cargar la info del equipo
        if (isFocused) {
            fetchTeam();
        }
    }, [isFocused]);

    const detailsStyle = StyleSheet.create({
        view: {
            flex: 1,
            backgroundColor: 'white',
            padding: 15,
        },
        viewChild: {
            justifyContent: 'center',
            gap: 20,
        },
        text: {
            fontSize: 15,
        },
        loading: {
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    return (
        <ScrollView style={detailsStyle.view} contentContainerStyle={detailsStyle.viewChild}>
            <Stack.Screen
                options={{
                    title: `Detalles de ${team.name ? team.name : '...'}`,
                    headerTintColor: '#ffff',
                    headerStyle: { backgroundColor: '#233750FF' },
                }}
            />
            {loading ? (
                <View style={detailsStyle.loading}>
                    <ActivityIndicator size={'large'} />
                </View>
            ) : (
                <>
                    <TeamCard
                        key={team.id}
                        nombre={team.name}
                        descripcion={team.description}
                        id={team.id}
                        extended={true}
                    />
                    <Text style={detailsStyle.text}>{`Descripción: ${team.description}`}</Text>
                    <Text style={detailsStyle.text}>{`Cantidad de puntos: ${team.points}`}</Text>
                    <Text style={detailsStyle.text}>{`Cantidad de goles: ${team.goals}`}</Text>
                    <Button
                        color='#D79B03FF'
                        title="Editar Equipo"
                        onPress={() => {
                            navigation.navigate('pages/TeamEdit', { id: team.id, modoEditar: '1' });
                        }}
                    />
                    <Button
                        color='#AC0505FF'
                        title="Borrar Equipo"
                        onPress={ async () => {
                            await deleteEquipo(team.id);
                            navigation.goBack();
                        }}
                    />
                </>
            )}
        </ScrollView>
    );
};

export default TeamDetails;
