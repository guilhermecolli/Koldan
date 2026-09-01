import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaskInput from "react-native-mask-input";
import API_URL from "../../../src/services/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar_password, setConfirmar_password] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfMasked, setcpfUnmasked] = useState("");

  const MaskCPF = [
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];

  const handleRegister = async () => {
    try {
      if (!name || !cpf || !email || !password || !confirmar_password) {
        Alert.alert("Atenção", "Preencha todos os campos.");
        return;
      }

      if (password !== confirmar_password) {
        Alert.alert("Atenção", "As senhas não conferem.");
        return;
      }

      if (cpf.length !== 11) {
        Alert.alert("Atenção", "CPF inválido.");
        return;
      }

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          cpf,
          email,
          password
        })
      });

      const data = await response.json();

      if (!data.success) {
        Alert.alert("Erro", data.message || "Não foi possível concluir o cadastro.");
        return;
      }

      Alert.alert("Sucesso", "Cadastro realizado! Verifique seu email para confirmar a conta.");

      // manda pra tela de digitar o código recebido no email, já com o user_id
      router.replace({
        pathname: "/auth/register/verifyemail",
        params: { user_id: data.user.id },
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <View style={styles.card}>
        <Text style={styles.title}>CADASTRE-SE</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          onChangeText={setName}
        />

        <MaskInput
          style={styles.input}
          placeholder="XXX.XXX.XXX-XX"
          keyboardType="numeric"
          value={cpfMasked}
          mask={MaskCPF}
          onChangeText={(masked, unmasked) => {
            setcpfUnmasked(masked);
            setCpf(unmasked);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="e-mail@exemplo.com"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          maxLength={50}
          placeholder="•••••••••••••"
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          maxLength={50}
          placeholder="•••••••••••••"
          secureTextEntry={true}
          onChangeText={setConfirmar_password}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: "85%",
    backgroundColor: "#D379EC",
    borderRadius: 26,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 6,
  },
  title: {
    fontSize: 26,
    marginBottom: 23,
    marginTop: 12,
    color: "#FFF",
    fontWeight: "700",
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
  button: {
    width: '60%',
    height: 50,
    backgroundColor: '#E1A8F0',
    borderRadius: 15,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    letterSpacing: 1
  },
});