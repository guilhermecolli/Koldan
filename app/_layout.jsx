import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <LinearGradient
      colors={['#FFC2C3', '#F889D0', '#F359D2', '#6B41BF', '#0E1938']}
      locations={[0, 0.12, 0.22, 0.62, 0.92]}
      start={{ x: 1, y: 0.22 }}
      end={{ x: 0, y: 0.88 }}
      style={styles.background}
    >
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});