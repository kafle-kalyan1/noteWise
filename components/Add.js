import React, { useState } from "react";
import { Button, KeyboardAvoidingView, TextInput, StyleSheet, View } from "react-native";
import * as SecureStore from "expo-secure-store";

const Add = (p) => {
    const [textInputTitle, setTextInputTitle] = useState("");
    const [textInputContent, setTextInputContent] = useState("");

    const saveItem = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    };

    const save = async () => {
        if (textInputContent.trim() === "" || textInputTitle.trim() === "") {
            alert("Please fill in all fields");
        } else {
            let d = new Date();
            let time = d.getTime();
            let obj = {
                title: textInputTitle,
                content: textInputContent,
                date: time,
            };
            saveItem(time.toString(), JSON.stringify(obj));
            let allKeys = JSON.parse(await SecureStore.getItemAsync("all"));
            let newList = [...allKeys, time];
            await SecureStore.setItemAsync("all", JSON.stringify(newList));
            setTextInputContent("");
            setTextInputTitle("");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.card}>
                <TextInput
                    placeholder="Note Title"
                    placeholderTextColor="#01579b"
                    style={styles.titleInput}
                    autoCorrect={false}
                    onChangeText={(value) => setTextInputTitle(value)}
                    value={textInputTitle}
                />
                <TextInput
                    autoCorrect={false}
                    multiline={true}
                    numberOfLines={5}
                    placeholder="Please Describe here...!"
                    placeholderTextColor="#01579b"
                    style={styles.contentInput}
                    onChangeText={(value) => setTextInputContent(value)}
                    value={textInputContent}
                />
            </View>
            <Button title="Add Note" color="#01579b" onPress={save} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
        justifyContent: "space-evenly",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        
    },
    titleInput: {
        fontSize: 22,
        color: "#01579b",
        
    },
    contentInput: {
        fontSize: 18,
        color: "#01579b",
        marginTop: 10,
    },
});

export default Add;
