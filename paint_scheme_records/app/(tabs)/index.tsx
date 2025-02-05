import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";

export default function Tab() {
	interface Topic {
		slug: string;
		description: string;
	}
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Topic[]>([]);
	const [error, setError] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://nc-news-api-88m2.onrender.com/api/topics"
				);
				const json = await response.json();
				setData(json); // ✅ Access the 'topics' array inside the JSON
				console.log(json, "<<<<<<< json");
			} catch (err) {
				console.error(err); // ✅ Log actual error for debugging
				setError("An error has occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<View>
			<Text>My Schemes</Text>
			<FlatList
				data={data}
				keyExtractor={(item) => item.slug}
				renderItem={({ item }) => {
					console.log(item, "<<<<< item"); // 🔍 Debug here
					return (
						<View style={styles.item}>
							<Text style={styles.title}>{item.slug}</Text>
							<Text>{item.description}</Text>
						</View>
					);
				}}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	loader: {
		flex: 1,
		justifyContent: "center",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "red",
		fontSize: 18,
	},
	item: {
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "black",
	},
});
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// });
