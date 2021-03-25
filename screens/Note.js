import AsyncStorage from "@react-native-community/async-storage"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Button, Text } from "@ui-kitten/components"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"

export default function Note({ route }) {
	const [ notes, setNotes ] = useState([])
	const { singleNote } = route.params
	const navigation = useNavigation()

	useFocusEffect(
		React.useCallback(() => {
			getNotes()
		}, [])
	)

	const getNotes = () => {
		AsyncStorage.getItem("NOTES").then((notes) => {
			setNotes(JSON.parse(notes))
		})
	}

	const deleteNote = async () => {
		const newNotes = await notes.filter((note) => note !== singleNote)
		await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes)).then(() => navigation.navigate("AllNotes"))
	}

	return (
		<View style={{ backgroundColor: "#222B45", flex: 1 }}>
			<Text style={styles.title} category="h1">
				Notes
			</Text>
			<Text style={{ fontSize: 22, margin: 20 }}>{singleNote}</Text>
			<View style={styles.bottom}>
				<Button onPress={deleteNote} style={styles.button}>
					Delete
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	item: {
		marginVertical: 4
	},
	title: {
		textAlign: "center",
		marginTop: 50
	},
	notes: {
		fontSize: 24
	}
})
