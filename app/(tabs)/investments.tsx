import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useInvestments } from "@/lib/investments-context";
import { useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { useColors } from "@/hooks/use-colors";

export default function InvestmentsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { investments, getTotalPortfolioValue, getPortfolioGainLoss } = useInvestments();
  const [refreshing, setRefreshing] = useState(false);

  const totalValue = getTotalPortfolioValue();
  const gainLoss = getPortfolioGainLoss();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <ScreenContainer className="p-0">
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <>
            {/* Portfolio Summary */}
            <View className="bg-primary px-6 py-8 pb-12">
              <Text className="text-white text-sm font-medium opacity-80">
                Valor Total da Carteira
              </Text>
              <Text className="text-white text-4xl font-bold mt-2">
                {formatCurrency(totalValue)}
              </Text>
              <Text className="text-white text-xs opacity-60 mt-1">
                Investimentos
              </Text>
            </View>

            {/* Gain/Loss Card */}
            <View className="px-6 -mt-6 mb-6">
              <View
                className="bg-surface rounded-2xl p-4 border"
                style={{
                  borderColor:
                    gainLoss.gain >= 0 ? colors.success : colors.error,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-muted text-sm font-medium">
                      Ganho/Perda
                    </Text>
                    <Text
                      className="text-xl font-bold mt-1"
                      style={{
                        color:
                          gainLoss.gain >= 0
                            ? colors.success
                            : colors.error,
                      }}
                    >
                      {formatCurrency(gainLoss.gain)}
                    </Text>
                  </View>
                  <Text
                    className="text-lg font-bold"
                    style={{
                      color:
                        gainLoss.gain >= 0
                          ? colors.success
                          : colors.error,
                    }}
                  >
                    {gainLoss.gain >= 0 ? "+" : ""}
                    {gainLoss.percentage.toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>

            {/* Add Investment Button */}
            <View className="px-6 mb-4">
              <TouchableOpacity
                onPress={() => router.push("/add-investment")}
                className="bg-primary rounded-xl py-3 items-center"
              >
                <Text className="text-white font-semibold">+ Adicionar Investimento</Text>
              </TouchableOpacity>
            </View>

            {/* Holdings Count */}
            {investments.length > 0 && (
              <View className="px-6 pb-3">
                <Text className="text-muted text-sm">
                  {investments.length} ativo{investments.length !== 1 ? "s" : ""}
                </Text>
              </View>
            )}
          </>
        }
        data={investments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const gainLoss = item.totalValue - item.quantity * item.purchasePrice;
          const gainLossPercent =
            item.quantity * item.purchasePrice === 0
              ? 0
              : (gainLoss / (item.quantity * item.purchasePrice)) * 100;

          return (
            <View className="px-6 mb-3">
              <TouchableOpacity
                className="bg-surface rounded-xl p-4 border"
                style={{ borderColor: colors.border }}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-foreground font-semibold flex-1">
                    {item.name}
                  </Text>
                  <Text
                    className="text-lg font-bold"
                    style={{
                      color:
                        gainLoss >= 0 ? colors.success : colors.error,
                    }}
                  >
                    {formatCurrency(item.totalValue)}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-muted text-xs">
                    {item.quantity} unidade{item.quantity !== 1 ? "s" : ""}
                  </Text>
                  <Text
                    className="text-xs font-semibold"
                    style={{
                      color:
                        gainLoss >= 0 ? colors.success : colors.error,
                    }}
                  >
                    {gainLoss >= 0 ? "+" : ""}
                    {gainLossPercent.toFixed(2)}%
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-muted text-lg">Nenhum investimento registrado</Text>
          </View>
        }
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
