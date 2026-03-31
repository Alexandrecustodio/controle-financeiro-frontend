import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useInvestments } from "@/lib/investments-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useColors } from "@/hooks/use-colors";

export default function AddInvestmentScreen() {
  const router = useRouter();
  const colors = useColors();
  const { addInvestment } = useInvestments();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [category, setCategory] = useState("Ações");
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Ações", "Fundos", "Criptomoedas", "Imóveis", "Outro"];

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Erro", "Digite o nome do investimento");
      return;
    }

    if (!quantity || parseFloat(quantity) <= 0) {
      Alert.alert("Erro", "Digite uma quantidade válida");
      return;
    }

    if (!purchasePrice || parseFloat(purchasePrice) <= 0) {
      Alert.alert("Erro", "Digite um preço de compra válido");
      return;
    }

    if (!currentPrice || parseFloat(currentPrice) <= 0) {
      Alert.alert("Erro", "Digite um preço atual válido");
      return;
    }

    try {
      setIsLoading(true);
      const qty = parseFloat(quantity);
      const pPrice = parseFloat(purchasePrice);
      const cPrice = parseFloat(currentPrice);

      await addInvestment({
        name: name.trim(),
        quantity: qty,
        purchasePrice: pPrice,
        currentPrice: cPrice,
        totalValue: qty * cPrice,
        category,
      });

      Alert.alert("Sucesso", "Investimento adicionado com sucesso!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Falha ao adicionar investimento");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Text className="text-foreground text-2xl font-bold">Adicionar Investimento</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary text-lg font-semibold">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Name Input */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Nome do Ativo</Text>
            <TextInput
              className="bg-surface rounded-lg px-4 py-3 border text-foreground"
              style={{ borderColor: colors.border }}
              placeholder="Ex: PETR4, Bitcoin"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Quantity Input */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Quantidade</Text>
            <TextInput
              className="bg-surface rounded-lg px-4 py-3 border text-foreground"
              style={{ borderColor: colors.border }}
              placeholder="Ex: 10"
              placeholderTextColor={colors.muted}
              keyboardType="decimal-pad"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>

          {/* Purchase Price Input */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Preço de Compra</Text>
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
                value={purchasePrice}
                onChangeText={setPurchasePrice}
              />
            </View>
          </View>

          {/* Current Price Input */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Preço Atual</Text>
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
                value={currentPrice}
                onChangeText={setCurrentPrice}
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
                {isLoading ? "Adicionando..." : "Adicionar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
