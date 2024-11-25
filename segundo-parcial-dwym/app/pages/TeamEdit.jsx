import { View, TextInput, Button, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { getEquipoById, updateEquipo, createEquipo } from '../api';
import { useNavigation } from '@react-navigation/native';

const TeamEdit = () => {
    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState('');
    const [logo, setLogo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [goles, setGoles] = useState('');
    const [puntos, setPuntos] = useState('');

    useEffect(() => {
        const fetchTeam = async () => {
            setLoading(true);
            const response = await getEquipoById(params.id);
            setTeam(response);
            setNombre(response.name);
            setLogo(response.logo);
            setDescripcion(response.description);
            setGoles(response.goals.toString());
            setPuntos(response.points.toString());
            setLoading(false);
        };
        if (params.modoEditar === '1'){
            fetchTeam();
        }else{
            setLoading(false);
        }
    }, []);

    const handleSubmit = async () => {
        const newTeam = {
            name: nombre,
            logo: logo,
            description: descripcion,
            goals: goles,
            points: puntos,
        };
        if (params.modoEditar === '1') {
            newTeam.id=team.id,
            await updateEquipo(newTeam, team.id);
        } else {
            await createEquipo(newTeam);
        }
        navigation.goBack();
    };

    if (loading) {
        return (
            <View>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    const styles = StyleSheet.create({
        separador: {
            height: 15,
        },
        container: {
            padding: 15,
            backgroundColor: '#f0f0f0',
            flexGrow: 1,
        },
        label: {
            fontSize: 16,
            marginTop: 15,
        },
        input: {
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 5,
        },
        textArea: {
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 5,
            height: 100,
        },
    });


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen
                options={{
                    title: `${params.modoEditar === '1' ? 'Editando equipo' : 'Creando equipo'}`,
                    headerTintColor: '#ffff',
                    headerStyle: { backgroundColor: '#233750FF' },
                }}
            />
            <Text style={styles.label}>Nombre del equipo:</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ejemplo: Bolivia"
            />

            <Text style={styles.label}>Descripción:</Text>
            <TextInput
                style={styles.textArea}
                value={descripcion}
                onChangeText={setDescripcion}
                placeholder="Descripción del equipo"
                multiline
            />

            <Text style={styles.label}>URL del logo:</Text>
            <TextInput
                style={styles.input}
                value={logo}
                onChangeText={setLogo}
                placeholder="http://ejemplo.com/imagen.jpg"
            />

            <Text style={styles.label}>Cantidad de puntos:</Text>
            <TextInput
                style={styles.input}
                value={puntos}
                onChangeText={setPuntos}
                placeholder="Ejemplo: 34"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Cantidad de goles:</Text>
            <TextInput
                style={styles.input}
                value={goles}
                onChangeText={setGoles}
                placeholder="Ejemplo: 12"
                keyboardType="numeric"
            />
            <View style={styles.separador} />
            <Button title={params.modoEditar === '1' ? 'Confirmar cambios' : 'Crear equipo'} onPress={handleSubmit} />
        </ScrollView>
    );
};

export default TeamEdit;
