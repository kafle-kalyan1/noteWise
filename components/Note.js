import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Note(props) {
    const deleteItem = async (key) => {
        await SecureStore.deleteItemAsync(key);
    };

    const showAlert = () => {
        Alert.alert("Delete", "Are you sure you want to delete?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Yes",
                onPress: () => {
                    deleteItem(props.id.toString());
                    props.fun();
                },
            },
        ]);
    };

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: "#ffffff" }]}
            onLongPress={showAlert}
        >
            <Text style={styles.dateText}>
                {new Date(props.date).toLocaleDateString()}
            </Text>
            <Text style={styles.headerText}>{props.header}</Text>
            <Text style={styles.contentText}>{props.content}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    dateText: {
        textAlign: "right",
        marginBottom: 5,
        color: "#888",
    },
    headerText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    contentText: {
        marginTop: 5,
    },
});
