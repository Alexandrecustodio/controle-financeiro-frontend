import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFinance } from "@/lib/finance-context";
import { getMonthString, TransactionCategory } from "@/lib/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useColors } from "@/hooks/use-colors";


export default function AddTransactionScreen() {
  const router = useRouter();
  const colors = useColors();
  const { addTransaction } = useFinance();

  const [category, setCategory] = useState<TransactionCategory>("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);

  const categories: { value: TransactionCategory; label: string }[] = [
    { value: "income", label: "Renda" },
    { value: "expense", label: "Despesa" },
    { value: "transfer", label: "Transferência" },
  ];

  const handleDateChange = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  const handleSave = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Erro", "Digite um valor válido");
      return;
    }

    try {
      setIsLoading(true);
      await addTransaction({
        date,
        category,
        amount: parseFloat(amount),
        description: description || categories.find((c) => c.value === category)?.label || category,
        month: getMonthString(date),
      });

      Alert.alert("Sucesso", "Transação adicionada com sucesso!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Falha ao adicionar transação");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const numValue = parseFloat(value.replace(/\D/g, "")) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numValue || 0);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Text className="text-foreground text-2xl font-bold">Adicionar Transação</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary text-lg font-semibold">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Category Selection */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Tipo</Text>
            <View className="flex-row gap-2">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.value}
                  onPress={() => setCategory(cat.value)}
                  className="flex-1 py-3 rounded-lg border"
                  style={{
                    backgroundColor:
                      category === cat.value ? colors.primary : "transparent",
                    borderColor:
                      category === cat.value ? colors.primary : colors.border,
                  }}
                >
                  <Text
                    className="text-center font-semibold"
                    style={{
                      color:
                        category === cat.value
                          ? colors.background
                          : colors.foreground,
                    }}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Amount Input */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Valor</Text>
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
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          {/* Date Picker */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Data</Text>
            <TouchableOpacity
              onPress={handleDateChange}
              className="bg-surface rounded-lg px-4 py-3 border"
              style={{ borderColor: colors.border }}
            >
              <Text className="text-foreground text-lg">
                {date.toLocaleDateString("pt-BR")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description Input */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Descrição (Opcional)</Text>
            <TextInput
              className="bg-surface rounded-lg px-4 py-3 border text-foreground"
              style={{ borderColor: colors.border }}
              placeholder="Ex: Supermercado, Salário..."
              placeholderTextColor={colors.muted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
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
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
