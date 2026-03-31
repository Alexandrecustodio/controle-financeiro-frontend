import { ScrollView, Text, View, TouchableOpacity, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useColors } from "@/hooks/use-colors";

import { useState } from "react";

export default function SettingsScreen() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  const toggleTheme = () => {
    // Theme toggle would be implemented here
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View>
            <Text className="text-foreground text-3xl font-bold">Configurações</Text>
          </View>

          {/* Appearance Section */}
          <View className="gap-3">
            <Text className="text-foreground text-lg font-bold">Aparência</Text>

            <View
              className="bg-surface rounded-xl p-4 border flex-row items-center justify-between"
              style={{ borderColor: colors.border }}
            >
              <View>
                <Text className="text-foreground font-semibold">Modo Escuro</Text>
                <Text className="text-muted text-xs mt-1">
                  {isDarkMode ? "Ativado" : "Desativado"}
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={handleThemeToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={isDarkMode ? colors.primary : colors.surface}
              />
            </View>
          </View>

          {/* About Section */}
          <View className="gap-3">
            <Text className="text-foreground text-lg font-bold">Sobre</Text>

            <View
              className="bg-surface rounded-xl p-4 border"
              style={{ borderColor: colors.border }}
            >
              <View className="gap-3">
                <View className="flex-row justify-between">
                  <Text className="text-muted">Versão</Text>
                  <Text className="text-foreground font-semibold">1.0.0</Text>
                </View>

                <View
                  className="h-px bg-border"
                  style={{ backgroundColor: colors.border }}
                />

                <View className="flex-row justify-between">
                  <Text className="text-muted">Desenvolvido por</Text>
                  <Text className="text-foreground font-semibold">Finance App</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Data Section */}
          <View className="gap-3">
            <Text className="text-foreground text-lg font-bold">Dados</Text>

            <TouchableOpacity
              className="bg-surface rounded-xl p-4 border"
              style={{ borderColor: colors.border }}
            >
              <Text className="text-foreground font-semibold">Exportar Dados</Text>
              <Text className="text-muted text-xs mt-1">
                Baixe um backup de seus dados
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-error/10 rounded-xl p-4 border border-error"
              style={{ backgroundColor: colors.error + "20", borderColor: colors.error }}
            >
              <Text className="text-error font-semibold">Limpar Dados</Text>
              <Text className="text-error/70 text-xs mt-1">
                Remova todos os dados do aplicativo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info Section */}
          <View className="gap-3 mt-4">
            <Text className="text-muted text-xs text-center">
              Finance App v1.0.0
            </Text>
            <Text className="text-muted text-xs text-center">
              Gerencie suas finanças com facilidade
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
