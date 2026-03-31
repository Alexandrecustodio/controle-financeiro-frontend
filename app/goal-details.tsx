import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useGoals } from "@/lib/goals-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { useColors } from "@/hooks/use-colors";

export default function GoalDetailsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const { goals, updateGoal } = useGoals();

  const goal = goals.find((g) => g.id === id);
  const [contributionAmount, setContributionAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!goal) {
      Alert.alert("Erro", "Meta não encontrada");
      router.back();
    }
  }, [goal]);

  const handleAddContribution = async () => {
    if (!id || !goal) return;

    if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
      Alert.alert("Erro", "Digite um valor válido");
      return;
    }

    try {
      setIsLoading(true);
      const newAmount = Math.min(
        goal.currentAmount + parseFloat(contributionAmount),
        goal.targetAmount
      );

      await updateGoal(id as string, {
        currentAmount: newAmount,
      });

      setContributionAmount("");
      Alert.alert("Sucesso", "Contribuição adicionada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao adicionar contribuição");
    } finally {
      setIsLoading(false);
    }
  };

  if (!goal) {
    return (
      <ScreenContainer className="p-6">
        <Text className="text-foreground text-center">Carregando...</Text>
      </ScreenContainer>
    );
  }

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const daysLeft = Math.ceil(
    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Text className="text-foreground text-2xl font-bold">{goal.name}</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary text-lg font-semibold">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Circle */}
          <View className="items-center gap-4">
            <View
              className="w-40 h-40 rounded-full items-center justify-center border-8"
              style={{
                borderColor: colors.primary,
                backgroundColor: colors.surface,
              }}
            >
              <View className="items-center">
                <Text className="text-4xl font-bold text-primary">
                  {Math.round(progress)}%
                </Text>
                <Text className="text-muted text-xs mt-1">Concluído</Text>
              </View>
            </View>

            {/* Amount Info */}
            <View className="items-center gap-1">
              <Text className="text-foreground text-lg font-semibold">
                {formatCurrency(goal.currentAmount)}
              </Text>
              <Text className="text-muted text-sm">
                de {formatCurrency(goal.targetAmount)}
              </Text>
            </View>
          </View>

          {/* Goal Info */}
          <View className="bg-surface rounded-xl p-4 border gap-3" style={{ borderColor: colors.border }}>
            <View className="flex-row justify-between">
              <Text className="text-muted">Categoria</Text>
              <Text className="text-foreground font-semibold">{goal.category}</Text>
            </View>
            <View
              className="h-px bg-border"
              style={{ backgroundColor: colors.border }}
            />
            <View className="flex-row justify-between">
              <Text className="text-muted">Data Alvo</Text>
              <Text className="text-foreground font-semibold">
                {new Date(goal.targetDate).toLocaleDateString("pt-BR")}
              </Text>
            </View>
            <View
              className="h-px bg-border"
              style={{ backgroundColor: colors.border }}
            />
            <View className="flex-row justify-between">
              <Text className="text-muted">Dias Restantes</Text>
              <Text
                className="font-semibold"
                style={{
                  color: daysLeft > 0 ? colors.success : colors.error,
                }}
              >
                {daysLeft > 0 ? `${daysLeft} dias` : "Vencido"}
              </Text>
            </View>
            <View
              className="h-px bg-border"
              style={{ backgroundColor: colors.border }}
            />
            <View className="flex-row justify-between">
              <Text className="text-muted">Status</Text>
              <Text className="text-foreground font-semibold capitalize">
                {goal.status === "active"
                  ? "Ativa"
                  : goal.status === "completed"
                    ? "Concluída"
                    : "Abandonada"}
              </Text>
            </View>
          </View>

          {/* Add Contribution */}
          {goal.status === "active" && goal.currentAmount < goal.targetAmount && (
            <View className="gap-3">
              <Text className="text-foreground font-semibold">Adicionar Contribuição</Text>
              <View
                className="bg-surface rounded-lg px-4 py-3 border flex-row items-center"
                style={{ borderColor: colors.border }}
              >
                <Text className="text-foreground text-lg font-semibold mr-2">R$</Text>
                <TextInput
                  className="flex-1 text-foreground text-lg"
                  placeholder="0,00"
                  placeholderTextColor={colors.muted}
                  keyboardType="decimal-pad"
                  value={contributionAmount}
                  onChangeText={setContributionAmount}
                />
              </View>

              <TouchableOpacity
                onPress={handleAddContribution}
                disabled={isLoading}
                className="bg-primary rounded-lg py-3"
                style={{ opacity: isLoading ? 0.6 : 1 }}
              >
                <Text className="text-white text-center font-semibold">
                  {isLoading ? "Adicionando..." : "Adicionar"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Edit Button */}
          <TouchableOpacity
            onPress={() => router.push(`/edit-goal?id=${goal.id}`)}
            className="bg-surface rounded-lg py-3 border"
            style={{ borderColor: colors.border }}
          >
            <Text className="text-foreground text-center font-semibold">Editar Meta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
