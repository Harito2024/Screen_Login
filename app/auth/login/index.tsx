import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const LoginScreen = () => {
  const { login } = useAuthStore();

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");

  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    const { email, password } = form;
    console.log({ email, password });

    if (email.length === 0 || password.length === 0) {
      return;
    }

    setIsPosting(true);

    const wasSuccessful = await login(email, password);
    setIsPosting(false);

    if (wasSuccessful) {
      router.replace("/");
      return;
    }

    Alert.alert("Error", "Usuario o Contraseña Incorrecta");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor,
        }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Inrgese para continuar
          </ThemedText>

          <View style={{ marginTop: 20 }}>
            <ThemedTextInput
              placeholder="Correo Electronico"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />

            <ThemedTextInput
              placeholder="Contraseña"
              secureTextEntry
              autoCapitalize="none"
              icon="lock-closed-outline"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
          </View>
          {/* Boton */}
          <ThemedButton
            icon="arrow-forward-outline"
            onPress={onLogin}
            disabled={isPosting}
          >
            Ingresar
          </ThemedButton>

          <View style={{ marginTop: 50 }} />
          {/* Enlace a registro */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText>No tienes cuenta?</ThemedText>
            <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
              Crear cuenta
            </ThemedLink>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
