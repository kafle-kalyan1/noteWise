import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import Note from "./Note";

const Main = ({ navigation }) => {
    const [notes, setNotes] = useState([]);

    const getItem = async (key) => {
        let result = await SecureStore.getItemAsync(key);
        return result;
    };

    const getAllItems = async () => {
        let result = await SecureStore.getItemAsync("all");
        let tab = [];
        if (result) {
            const noteIds = JSON.parse(result);
            for (const note of noteIds) {
                let obj = await getItem(note.toString());
                tab.push(JSON.parse(obj));
            }
        }
        setNotes(tab);
    };

    useEffect(() => {
        const fetchNotes = async () => {
            navigation.addListener("focus", async () => {
                let result = await SecureStore.getItemAsync("all");
                if (!result) {
                    await SecureStore.setItemAsync("all", JSON.stringify([]));
                }
                getAllItems();
            });

            let result = await SecureStore.getItemAsync("all");
            if (!result) {
                await SecureStore.setItemAsync("all", JSON.stringify([]));
            }
            getAllItems();
        };

        fetchNotes();
    }, []);

    const renderNotes = () => {
        return notes.map((item) => {
            if (item) {
                return (
                    <Note
                        color={item.color}
                        header={item.title}
                        content={item.content}
                        id={item.date}
                        date={item.date}
                        key={item.date}
                        fun={getAllItems}
                    />
                );
            }
            return null;
        });
    };

    const { leftCol, rightCol } = splitIntoColumns(renderNotes());

    const handleAddNote = () => {
        navigation.navigate("add");
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                style={styles.scrollView}
            >
                <View style={styles.column}>{leftCol}</View>
                <View style={styles.column}>{rightCol}</View>
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
                <Ionicons name="add" size={26} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const splitIntoColumns = (array) => {
    const leftCol = array.filter((_item, index) => index % 2 !== 0);
    const rightCol = array.filter((_item, index) => index % 2 === 0);
    return { leftCol, rightCol };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    scrollViewContent: {
        flexGrow: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    scrollView: {
        flex: 1,
    },
    column: {
        flex: 1,
        padding: 10,
    },
    addButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#0061F2",
        borderRadius: 25,
        padding: 10,
    },
});

export default Main;
