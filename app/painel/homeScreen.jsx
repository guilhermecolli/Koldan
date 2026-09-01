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
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");

      router.replace("/");
    } catch (error) {
      console.log("Erro ao sair:", error);
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Início</Text>

        <View style={styles.containerButton}>

          <TouchableOpacity style={styles.eventButton} onPress={() => router.push('/painel/events')}>
            <Text style={styles.buttonText}>Eventos ativos</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/painel/addevents')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/painel/reports')}>
          <Text style={styles.buttonText}>Relatórios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
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

  containerButton: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5.5,
    elevation: 5,
  },
  eventButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#E1A8F0",
    marginBottom: 12,
    marginRight: 0.5,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 5,
  },
  addButton: {
    width: "20%",
    height: 50,
    backgroundColor: "#E1A8F0",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 12,
    marginLeft: 0.5,
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
  logoutButton: {
    width: "60%",
    height: 50,
    backgroundColor: "#E1A8F0",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 5,
  },

  logoutText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
});