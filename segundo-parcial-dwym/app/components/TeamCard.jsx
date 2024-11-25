import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Link } from "expo-router";

function TeamCard({ nombre, descripcion, id, extended = false }) {
    const teamStyle = StyleSheet.create({
        container: {
            backgroundColor: "white",
            borderRadius: 10,
            width: "100%",
            padding: extended ? 0 : 15,
            flex: 1,
            gap: 15,
            justifyContent: extended ? "space-evenly" : "center",
            alignItems: "left",
        },
        image: {
            width: extended ? 200 : 100,
            height: extended ? 200 : 100,
            borderRadius: "50%"
        },
        name: {
            fontWeight: "w600",
            color: "black",
            fontSize: 30,
        }
    })

    return (
        <Link href={{
            pathname: "/pages/TeamDetails",
            params: { id: id },
        }}
        >
            <View style={teamStyle.container}>
                {/* <Image source={{ uri: logo }} style={teamStyle.image} /> */}
                <Text style={teamStyle.name}>{nombre}</Text>
                {!extended ? <Text style={teamStyle.descripcion}>{descripcion}</Text> : <></>}
            </View>
        </Link >
    )
}

export default TeamCard