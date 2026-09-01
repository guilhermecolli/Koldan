import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.title}>Eventos Ativos</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/painel/metodoBarCodeScan')}
            >
              <Text style={styles.buttonText}>Código de Barras</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    width: "85%",
    height: "60%",
    backgroundColor: "#D379EC",
    borderRadius: 26,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 6,
  },
  title: {
    fontSize: 26,
    marginBottom: 23,
    marginTop: 10,
    color: "#FFF",
    fontWeight: "700",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#E1A8F0",
    borderRadius: 15,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 1,
  },
});