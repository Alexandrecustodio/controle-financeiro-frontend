import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFinance } from "@/lib/finance-context";
import { getMonthString, getMonthName, getPreviousMonth, getNextMonth } from "@/lib/types";
import { useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { useColors } from "@/hooks/use-colors";

export default function TransactionsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { getTransactionsByMonth, deleteTransaction } = useFinance();
  const [refreshing, setRefreshing] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(getMonthString());

  const transactions = getTransactionsByMonth(currentMonth);
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const handlePreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      income: "Renda",
      expense: "Despesa",
      transfer: "Transferência",
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "income":
        return colors.success;
      case "expense":
        return colors.error;
      case "transfer":
        return colors.primary;
      default:
        return colors.foreground;
    }
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-transaction?id=${id}`);
  };

  return (
    <ScreenContainer className="p-0">
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <>
            {/* Month Selector */}
            <View className="px-6 py-4 gap-4">
              <View className="flex-row items-center justify-between">
                <TouchableOpacity
                  onPress={handlePreviousMonth}
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: colors.surface }}
                >
                  <Text className="text-foreground font-semibold">←</Text>
                </TouchableOpacity>

                <Text className="text-foreground text-lg font-bold">
                  {getMonthName(currentMonth)}
                </Text>

                <TouchableOpacity
                  onPress={handleNextMonth}
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: colors.surface }}
                >
                  <Text className="text-foreground font-semibold">→</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/add-transaction")}
                className="bg-primary rounded-xl py-3 items-center"
              >
                <Text className="text-white font-semibold">+ Adicionar Transação</Text>
              </TouchableOpacity>
            </View>

            {/* Transaction Count */}
            {sortedTransactions.length > 0 && (
              <View className="px-6 pb-3">
                <Text className="text-muted text-sm">
                  {sortedTransactions.length} transação{sortedTransactions.length !== 1 ? "s" : ""}
                </Text>
              </View>
            )}
          </>
        }
        data={sortedTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-6 mb-2">
            <TouchableOpacity
              onPress={() => handleEdit(item.id)}
              className="bg-surface rounded-xl p-4 border flex-row items-center justify-between"
              style={{ borderColor: colors.border }}
            >
              <View className="flex-1">
                <Text className="text-foreground font-semibold">
                  {item.description || getCategoryLabel(item.category)}
                </Text>
                <Text className="text-muted text-xs mt-1">
                  {new Date(item.date).toLocaleDateString("pt-BR")}
                </Text>
              </View>
              <Text
                className="text-lg font-bold"
                style={{
                  color: getCategoryColor(item.category),
                }}
              >
                {item.category === "expense" ? "-" : "+"}
                {formatCurrency(item.amount)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-muted text-lg">Nenhuma transação neste mês</Text>
          </View>
        }
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
