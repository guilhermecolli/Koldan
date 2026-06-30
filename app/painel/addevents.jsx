import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import MaskInput from "react-native-mask-input";
import { useState } from "react";

export default function HomeScreen() {
  const [evento, setEvento] = useState("");
  const [data, setData] = useState("");
  const [dataMasked, setdataUnmasked] = useState("");

  const MaskData = [
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    "/",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ]

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
          <View style={styles.card}>
              <Text style={styles.title}>Adicionar Evento</Text>

              <TextInput
              style={styles.input}
              placeholder="Nome do Evento"
              />

              <MaskInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              maxLength={10}
              keyboardType="numeric"
              value={dataMasked}
              mask={MaskData}
              onChangeText={(masked, unmasked) => {
                setdataUnmasked(masked);
                setData(unmasked);
              }}
              />
          </View>

          <View style={styles.card}>
            <Text style={styles.title2}>Cadastrar Participantes</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Baixar modelo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Importar arquivo</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.buttonText}>Salvar Alterações</Text>
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
    marginTop: 12,
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
  title2: {
    fontSize: 22,
    marginBottom: 23,
    marginTop: 10,
    color: "#FFF",
    fontWeight: "700",
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#E1A8F0",
    borderRadius: 8,
    marginBottom: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  saveButton: {
    width: "75%",
    height: 40,
    backgroundColor: "#E1A8F0",
    borderRadius: 8,
    marginTop: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 1,
  },
  input: {
    width: "95%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D379EC',
    backgroundColor: '#ECBFF9',
    paddingHorizontal: 14,
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 14,
  },
});