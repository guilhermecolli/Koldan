import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import API_URL from '../../src/services/api';

// registration_number no banco é VARCHAR(45) — só aceita letras e números,
// isso barra código de barras corrompido, lixo, ou tentativa de injetar coisa
const CODIGO_VALIDO = /^[A-Za-z0-9]{1,45}$/;

const EVENT_ID = 1;

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  const validarPresenca = async (registration_number) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/attendance/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: EVENT_ID, registration_number }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao validar presença.");
      }

      Alert.alert(
        data.alreadyChecked ? "Presença já registrada" : "Presença confirmada",
        `${data.participant.name} (matrícula ${data.participant.registration_number})`,
        [{ text: "OK", onPress: () => setScanned(false) }]
      );
    } catch (error) {
      Alert.alert("Erro", error.message, [
        { text: "OK", onPress: () => setScanned(false) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = useCallback(
    ({ data }) => {
      if (scanned || loading) return;
      setScanned(true);

      const codigo = String(data).trim();

      if (!CODIGO_VALIDO.test(codigo)) {
        Alert.alert("Código inválido", "Esse código de barras não é reconhecido.", [
          { text: "OK", onPress: () => setScanned(false) },
        ]);
        return;
      }

      validarPresenca(codigo);
    },
    [scanned, loading]
  );

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Precisamos da câmera</Text>
          <Text style={styles.subtitle}>
            Para ler os códigos de barras, permita o acesso à câmera.
          </Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Permitir câmera</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128", "code39", "ean13", "ean8", "upc_a"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerText} numberOfLines={1}>Posicione o Código de Barras abaixo</Text>
        </View>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        )}
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
    fontSize: 22,
    marginBottom: 12,
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 16,
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
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  header: {
    backgroundColor: "rgba(211,121,236,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
    marginTop: "15%",
    minWidth: 315,
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#E1A8F0",
    borderRadius: 20,
  },
  loadingBox: {
    position: "absolute",
    top: "45%",
  },
  backButton: {
    width: "60%",
    height: 50,
    backgroundColor: "#E1A8F0",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
  },
});