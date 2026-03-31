import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useGoals } from "@/lib/goals-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useColors } from "@/hooks/use-colors";

export default function AddGoalScreen() {
  const router = useRouter();
  const colors = useColors();
  const { addGoal } = useGoals();

  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("Pessoal");
  const [targetDate, setTargetDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Pessoal", "Viagem", "Educação", "Saúde", "Investimento", "Outro"];

  const handleSave = async () => {
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
      await addGoal({
        name: name.trim(),
        targetAmount: parseFloat(targetAmount),
        currentAmount: 0,
        targetDate,
        category,
        status: "active",
      });

      Alert.alert("Sucesso", "Meta criada com sucesso!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Falha ao criar meta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = () => {
    // Simple date increment for demo purposes
    const newDate = new Date(targetDate);
    newDate.setDate(newDate.getDate() + 1);
    setTargetDate(newDate);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Text className="text-foreground text-2xl font-bold">Criar Meta</Text>
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

          {/* Target Date */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Data Alvo</Text>
            <TouchableOpacity
              onPress={handleDateChange}
              className="bg-surface rounded-lg px-4 py-3 border"
              style={{ borderColor: colors.border }}
            >
              <Text className="text-foreground text-lg">
                {targetDate.toLocaleDateString("pt-BR")}
              </Text>
            </TouchableOpacity>
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
                {isLoading ? "Criando..." : "Criar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
