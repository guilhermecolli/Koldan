import { router } from 'expo-router';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import API_URL from '../src/services/api';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        if (token) {
          router.replace("./painel/homeScreen");
        }
      } catch (error) {
        console.log("Erro ao verificar sessão:", error);
      }
    };

    verificarToken();
  }, []);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Atenção", "Preencha email e senha.");
        return;
      }

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!data.success) {
        Alert.alert("Erro", data.message || "Não foi possível fazer login.");
        return;
      }

      await SecureStore.setItemAsync("token", data.token);
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));

      router.replace("/painel/homeScreen");
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
      <Text style={styles.title}>Koldan</Text>
      <View style={styles.card}>
        <Text style={styles.title}>User Login</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não possui conta?</Text>

        <TouchableOpacity onPress={() => router.push('/auth/register/page')}>
          <Text style={styles.registerClick}> Cadastre-se</Text>
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
  card: {
    width: "85%",
    backgroundColor: "#D379EC",
    borderRadius: 26,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 6,
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
  title: {
    fontSize: 26,
    marginBottom: 23,
    marginTop: 10,
    color: "#FFF",
    fontWeight: "700",
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  registerText: {
  color: '#ffffffc0',
  fontSize: 15,
  fontWeight: '400',
  },
  registerClick: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});