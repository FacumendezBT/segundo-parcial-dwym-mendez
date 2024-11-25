import { View, ScrollView, StyleSheet, Platform, Dimensions, Button, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getEquipos } from '../api';
import { Stack } from 'expo-router';
import TeamCard from '../components/TeamCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const TeamsList = () => {
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [winDimensions, setWinDimensions] = useState(Dimensions.get('window'));
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        const updateDimensions = () => {
            setWinDimensions(Dimensions.get('window'));
        };

        const fetchInfo = async () => {
            setLoading(true);
            const response = await getEquipos();
            setEquipos(response);
            setLoading(false);
        };

        // Esto es para que cuando vuelva de editarse algo en details o crear le vuelva a cargar la lista de equipos
        if (isFocused) {
            fetchInfo();
        }

        Dimensions.addEventListener('change', updateDimensions);
    }, [isFocused]);

    const teamsStyle = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
        },
        scrollView: {
            width: winDimensions.width * 0.85,
        },
        scrollViewContent: {
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
        },
        loading: {
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    return (
        <View style={teamsStyle.container}>
            <Stack.Screen
                options={{
                    title: 'Conmebol APP',
                    headerTintColor: '#ffff',
                    headerStyle: { backgroundColor: '#233750FF' },
                }}
            />
            <Button
                color={Platform.OS === 'ios' ? '#007004FF' : '#004FB0FF'}
                title={Platform.OS === 'ios' ? 'Crear Equipo' : 'Nuevo Equipo'}
                onPress={() => {
                    navigation.navigate('pages/TeamEdit', { modoEditar: '0' });
                }}
            />
            {loading ? (
                <View style={teamsStyle.loading}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <ScrollView
                    style={teamsStyle.scrollView}
                    contentContainerStyle={teamsStyle.scrollViewContent}
                >
                    {equipos &&
                        equipos.map((team) => {
                            return (
                                <TeamCard
                                    key={team.id}
                                    nombre={team.name}
                                    logo={team.logo}
                                    descripcion={team.description}
                                    id={team.id}
                                />
                            );
                        })}
                </ScrollView>
            )}
        </View>
    );
};

export default TeamsList;
