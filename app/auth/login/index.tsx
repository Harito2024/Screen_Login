import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { KeyboardAvoidingView, useWindowDimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const LoginScreen = () => {
  const { height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
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
            />

            <ThemedTextInput
              placeholder="Contraseña"
              secureTextEntry
              autoCapitalize="none"
              icon="lock-closed-outline"
            />
          </View>
          <View style={{ marginTop: 10 }} />
          {/* Botones */}
          <ThemedButton icon="arrow-forward-outline">Ingresar</ThemedButton>
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
