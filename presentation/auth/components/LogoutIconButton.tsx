import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

import { Pressable } from "react-native-gesture-handler";
import { useAuthStore } from "../store/useAuthStore";
const LogoutIconButton = () => {
  const primaryColor = useThemeColor({}, "primary");
  const { logout } = useAuthStore();

  return (
    <Pressable style={{ marginRight: 8 }} onPress={logout}>
      <Ionicons name="log-out-outline" size={24} color={primaryColor} />
    </Pressable>
  );
};
export default LogoutIconButton;
