import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFinance } from "@/lib/finance-context";
import { getMonthString, TransactionCategory } from "@/lib/types";
import { generateInstallments, validateInstallmentParams } from "@/lib/installment-utils";
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

  // Installment states
  const [useInstallment, setUseInstallment] = useState(false);
  const [installmentCount, setInstallmentCount] = useState("1");

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

    const numAmount = parseFloat(amount);
    const numInstallments = parseInt(installmentCount) || 1;

    // Validate installment parameters if enabled
    if (useInstallment) {
      const validation = validateInstallmentParams(numAmount, numInstallments);
      if (!validation.valid) {
        Alert.alert("Erro", validation.error || "Parâmetros de parcelamento inválidos");
        return;
      }
    }

    try {
      setIsLoading(true);

      if (useInstallment && numInstallments > 1) {
        // Generate installments
        const installments = generateInstallments(
          {
            date,
            category,
            amount: numAmount,
            description: description || categories.find((c) => c.value === category)?.label || category,
            month: getMonthString(date),
          },
          numInstallments
        );

        // Add all installments
        for (const installment of installments) {
          await addTransaction(installment);
        }

        Alert.alert(
          "Sucesso",
          `Despesa parcelada em ${numInstallments}x adicionada com sucesso!\nValor de cada parcela: R$ ${(numAmount / numInstallments).toFixed(2)}`
        );
      } else {
        // Add single transaction
        await addTransaction({
          date,
          category,
          amount: numAmount,
          description: description || categories.find((c) => c.value === category)?.label || category,
          month: getMonthString(date),
        });

        Alert.alert("Sucesso", "Transação adicionada com sucesso!");
      }

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

  const numAmount = parseFloat(amount) || 0;
  const numInstallments = parseInt(installmentCount) || 1;
  const installmentValue = numInstallments > 0 ? numAmount / numInstallments : 0;

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

          {/* Installment Section */}
          <View className="gap-4 bg-surface rounded-lg p-4 border" style={{ borderColor: colors.border }}>
            <View className="flex-row items-center justify-between">
              <Text className="text-foreground font-semibold">Parcelar Despesa?</Text>
              <TouchableOpacity
                onPress={() => setUseInstallment(!useInstallment)}
                className="w-12 h-7 rounded-full border-2 flex items-center justify-center"
                style={{
                  backgroundColor: useInstallment ? colors.primary : "transparent",
                  borderColor: useInstallment ? colors.primary : colors.border,
                }}
              >
                <Text className="text-lg">{useInstallment ? "✓" : ""}</Text>
              </TouchableOpacity>
            </View>

            {useInstallment && (
              <View className="gap-3">
                <View className="gap-2">
                  <Text className="text-foreground font-semibold text-sm">
                    Número de Parcelas (máx 60)
                  </Text>
                  <View
                    className="bg-background rounded-lg px-4 py-3 border flex-row items-center"
                    style={{ borderColor: colors.border }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        const current = parseInt(installmentCount) || 1;
                        if (current > 1) {
                          setInstallmentCount((current - 1).toString());
                        }
                      }}
                      className="px-3 py-2"
                    >
                      <Text className="text-primary text-xl font-bold">−</Text>
                    </TouchableOpacity>

                    <TextInput
                      className="flex-1 text-center text-foreground text-lg font-semibold"
                      keyboardType="number-pad"
                      value={installmentCount}
                      onChangeText={(value) => {
                        const num = parseInt(value) || 1;
                        if (num >= 1 && num <= 60) {
                          setInstallmentCount(num.toString());
                        }
                      }}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        const current = parseInt(installmentCount) || 1;
                        if (current < 60) {
                          setInstallmentCount((current + 1).toString());
                        }
                      }}
                      className="px-3 py-2"
                    >
                      <Text className="text-primary text-xl font-bold">+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Installment Preview */}
                {numAmount > 0 && numInstallments > 1 && (
                  <View className="bg-background rounded-lg p-3 gap-2">
                    <Text className="text-muted text-xs font-semibold">RESUMO</Text>
                    <View className="flex-row justify-between">
                      <Text className="text-foreground">Valor Total:</Text>
                      <Text className="text-foreground font-bold">
                        R$ {numAmount.toFixed(2)}
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-foreground">Parcelas:</Text>
                      <Text className="text-foreground font-bold">{numInstallments}x</Text>
                    </View>
                    <View className="h-px bg-border my-2" />
                    <View className="flex-row justify-between">
                      <Text className="text-foreground font-semibold">Valor por Parcela:</Text>
                      <Text className="text-primary font-bold">
                        R$ {installmentValue.toFixed(2)}
                      </Text>
                    </View>
                    <Text className="text-muted text-xs mt-2">
                      A despesa será distribuída nos próximos {numInstallments} meses
                    </Text>
                  </View>
                )}
              </View>
            )}
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
