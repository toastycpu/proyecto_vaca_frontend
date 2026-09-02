import { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { useLanguage } from '@/i18n/LanguageContext';

export default function CameraScreen() {
  const { mode, animalId } = useLocalSearchParams<{ mode: string; animalId: string }>();
  const { t } = useLanguage();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{t('cameraPermissionMessage')}</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>{t('grantPermission')}</Text>
        </Pressable>
      </View>
    );
  }

  const handleTakePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo) {
      // TODO: save photo.uri to the animal's record via backend later
      console.log('Photo taken for animal', animalId, photo.uri);
      router.back();
    }
  };

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    // TODO: look up animal by scanned tag/QR data later
    console.log('Scanned tag data:', data);
    router.back();
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={mode === 'scan' ? { barcodeTypes: ['qr'] } : undefined}
        onBarcodeScanned={mode === 'scan' ? handleBarcodeScanned : undefined}
      />
      <View style={styles.overlay}>
        {mode === 'photo' ? (
          <Pressable style={styles.captureButton} onPress={handleTakePhoto} />
        ) : (
          <Text style={styles.scanHint}>{t('alignQrCode')}</Text>
        )}
        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>{t('cancel')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2A2D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: { flex: 1, width: '100%' },
  overlay: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#D9E2C6',
    borderWidth: 4,
    borderColor: '#4A7340',
  },
  scanHint: {
    color: '#D9E2C6',
    fontSize: 14,
    backgroundColor: 'rgba(15,42,45,0.8)',
    padding: 8,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#1C3F3D',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  message: {
    color: '#D9E2C6',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#4A7340',
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#D9E2C6',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});