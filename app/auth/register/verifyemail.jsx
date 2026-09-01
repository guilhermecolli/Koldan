import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import API_URL from "../../../src/services/api";

export default function VerifyEmail() {
  const { user_id } = useLocalSearchParams();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const confirmarCodigo = async () => {
    if (!token) {
      Alert.alert("Atenção", "Digite o código recebido no email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível verificar o email.");
      }

      Alert.alert("Sucesso", "Email verificado com sucesso!", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (error) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Verificar Email</Text>
        <Text style={styles.subtitle}>
          Digite o código de 8 caracteres que enviamos para o seu email.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Código"
          autoCapitalize="none"
          value={token}
          onChangeText={setToken}
        />

        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={confirmarCodigo}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verificando..." : "Confirmar"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 12,
    color: "#FFF",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "95%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D379EC",
    backgroundColor: "#ECBFF9",
    paddingHorizontal: 14,
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 14,
    textAlign: "center",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#E1A8F0",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 1,
  },
});