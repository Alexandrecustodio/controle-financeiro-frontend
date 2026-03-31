import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useGoals } from "@/lib/goals-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { useColors } from "@/hooks/use-colors";

export default function EditGoalScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const { goals, updateGoal, deleteGoal } = useGoals();

  const goal = goals.find((g) => g.id === id);

  const [name, setName] = useState(goal?.name || "");
  const [targetAmount, setTargetAmount] = useState(goal?.targetAmount.toString() || "");
  const [currentAmount, setCurrentAmount] = useState(goal?.currentAmount.toString() || "");
  const [category, setCategory] = useState(goal?.category || "Pessoal");
  const [targetDate, setTargetDate] = useState(goal?.targetDate || new Date());
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Pessoal", "Viagem", "Educação", "Saúde", "Investimento", "Outro"];

  useEffect(() => {
    if (!goal) {
      Alert.alert("Erro", "Meta não encontrada");
      router.back();
    }
  }, [goal]);

  const handleSave = async () => {
    if (!id || !goal) return;

    if (!name.trim()) {
      Alert.alert("Erro", "Digite o nome da meta");
      return;
    }

    if (!targetAmount || parseFloat(targetAmount) <= 0) {
      Alert.alert("Erro", "Digite um valor válido");
      return;
    }

    try {
      setIsLoading(true);
      await updateGoal(id as string, {
        name: name.trim(),
        targetAmount: parseFloat(targetAmount),
        currentAmount: parseFloat(currentAmount) || 0,
        targetDate,
        category,
      });

      Alert.alert("Sucesso", "Meta atualizada com sucesso!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar meta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    Alert.alert("Confirmar", "Tem certeza que deseja deletar esta meta?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Deletar",
        onPress: async () => {
          try {
            await deleteGoal(id as string);
            Alert.alert("Sucesso", "Meta deletada com sucesso!");
            router.back();
          } catch (error) {
            Alert.alert("Erro", "Falha ao deletar meta");
          }
        },
        style: "destructive",
      },
    ]);
  };

  if (!goal) {
    return (
      <ScreenContainer className="p-6">
        <Text className="text-foreground text-center">Carregando...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Text className="text-foreground text-2xl font-bold">Editar Meta</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary text-lg font-semibold">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Name Input */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Nome da Meta</Text>
            <TextInput
              className="bg-surface rounded-lg px-4 py-3 border text-foreground"
              style={{ borderColor: colors.border }}
              placeholder="Ex: Viagem para Paris"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Target Amount Input */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Valor Alvo</Text>
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
                value={targetAmount}
                onChangeText={setTargetAmount}
              />
            </View>
          </View>

          {/* Current Amount Input */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Valor Atual</Text>
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
                value={currentAmount}
                onChangeText={setCurrentAmount}
              />
            </View>
          </View>

          {/* Category Selection */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Categoria</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  className="px-4 py-2 rounded-full border"
                  style={{
                    backgroundColor:
                      category === cat ? colors.primary : "transparent",
                    borderColor:
                      category === cat ? colors.primary : colors.border,
                  }}
                >
                  <Text
                    className="font-semibold"
                    style={{
                      color:
                        category === cat
                          ? colors.background
                          : colors.foreground,
                    }}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 mt-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-1 bg-surface rounded-lg py-3 border"
              style={{ borderColor: colors.border }}
            >
              <Text className="text-foreground text-center font-semibold">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              disabled={isLoading}
              className="flex-1 bg-primary rounded-lg py-3"
              style={{ opacity: isLoading ? 0.6 : 1 }}
            >
              <Text className="text-white text-center font-semibold">
                {isLoading ? "Salvando..." : "Salvar"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Delete Button */}
          <TouchableOpacity
            onPress={handleDelete}
            className="bg-error/10 rounded-lg py-3 border border-error"
            style={{ backgroundColor: colors.error + "20", borderColor: colors.error }}
          >
            <Text className="text-error text-center font-semibold">Deletar Meta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
