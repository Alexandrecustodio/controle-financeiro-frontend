import { ScrollView, Text, View, TouchableOpacity, RefreshControl } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useFinance } from "@/lib/finance-context";
import { useGoals } from "@/lib/goals-context";
import { getMonthString, getMonthName } from "@/lib/types";
import { useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { useColors } from "@/hooks/use-colors";

export default function DashboardScreen() {
  const router = useRouter();
  const colors = useColors();
  const { transactions, getSummary } = useFinance();
  const { goals } = useGoals();
  const [refreshing, setRefreshing] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(getMonthString());

  const summary = getSummary(currentMonth);
  const activeGoals = goals.filter((g) => g.status === "active");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const recentTransactions = transactions
    .filter((t) => t.month === currentMonth)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

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

  return (
    <ScreenContainer className="p-0">
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <View className="bg-primary px-6 py-8 pb-12">
          <Text className="text-white text-sm font-medium opacity-80">
            {getMonthName(currentMonth)}
          </Text>
          <Text className="text-white text-4xl font-bold mt-2">
            {formatCurrency(summary.totalBalance)}
          </Text>
          <Text className="text-white text-xs opacity-60 mt-1">Saldo Total</Text>
        </View>

        {/* Summary Cards */}
        <View className="px-6 -mt-6 gap-3 mb-6">
          {/* Income Card */}
          <View className="bg-surface rounded-2xl p-4 border border-border" style={{ borderColor: colors.border }}>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-muted text-sm font-medium">Renda</Text>
                <Text className="text-foreground text-xl font-bold mt-1">
                  {formatCurrency(summary.monthlyIncome)}
                </Text>
              </View>
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.success + "20" }}
              >
                <Text className="text-2xl">📈</Text>
              </View>
            </View>
          </View>

          {/* Expenses Card */}
          <View className="bg-surface rounded-2xl p-4 border border-border" style={{ borderColor: colors.border }}>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-muted text-sm font-medium">Despesas</Text>
                <Text className="text-foreground text-xl font-bold mt-1">
                  {formatCurrency(summary.monthlyExpenses)}
                </Text>
              </View>
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.error + "20" }}
              >
                <Text className="text-2xl">📉</Text>
              </View>
            </View>
          </View>

          {/* Net Card */}
          <View
            className="bg-surface rounded-2xl p-4 border"
            style={{
              borderColor: summary.monthlyNet >= 0 ? colors.success : colors.error,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-muted text-sm font-medium">Resultado</Text>
                <Text
                  className="text-xl font-bold mt-1"
                  style={{
                    color: summary.monthlyNet >= 0 ? colors.success : colors.error,
                  }}
                >
                  {formatCurrency(summary.monthlyNet)}
                </Text>
              </View>
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{
                  backgroundColor:
                    summary.monthlyNet >= 0
                      ? colors.success + "20"
                      : colors.error + "20",
                }}
              >
                <Text className="text-2xl">{summary.monthlyNet >= 0 ? "✅" : "⚠️"}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 gap-3 mb-6">
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => router.push("/add-transaction")}
              className="flex-1 bg-primary rounded-xl py-3 items-center"
            >
              <Text className="text-white font-semibold">+ Transação</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/add-goal")}
              className="flex-1 bg-surface rounded-xl py-3 items-center border border-border"
              style={{ borderColor: colors.border }}
            >
              <Text className="text-foreground font-semibold">+ Meta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        {recentTransactions.length > 0 && (
          <View className="px-6 mb-6">
            <Text className="text-foreground text-lg font-bold mb-3">Transações Recentes</Text>
            <View className="bg-surface rounded-2xl border border-border overflow-hidden" style={{ borderColor: colors.border }}>
              {recentTransactions.map((transaction, index) => (
                <View
                  key={transaction.id}
                  className="flex-row items-center justify-between p-4"
                  style={{
                    borderBottomColor: colors.border,
                    borderBottomWidth: index < recentTransactions.length - 1 ? 1 : 0,
                  }}
                >
                  <View className="flex-1">
                    <Text className="text-foreground font-semibold">
                      {transaction.description || getCategoryLabel(transaction.category)}
                    </Text>
                    <Text className="text-muted text-xs mt-1">
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </Text>
                  </View>
                  <Text
                    className="text-lg font-bold"
                    style={{
                      color: getCategoryColor(transaction.category),
                    }}
                  >
                    {transaction.category === "expense" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <View className="px-6 mb-8">
            <Text className="text-foreground text-lg font-bold mb-3">Metas Ativas</Text>
            <View className="gap-3">
              {activeGoals.slice(0, 3).map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                return (
                  <TouchableOpacity
                    key={goal.id}
                    onPress={() => router.push(`/goal-details?id=${goal.id}`)}
                    className="bg-surface rounded-2xl p-4 border border-border"
                    style={{ borderColor: colors.border }}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-foreground font-semibold flex-1">{goal.name}</Text>
                      <Text className="text-muted text-xs">
                        {Math.round(progress)}%
                      </Text>
                    </View>
                    <View className="h-2 bg-border rounded-full overflow-hidden" style={{ backgroundColor: colors.border }}>
                      <View
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: colors.primary,
                        }}
                      />
                    </View>
                    <View className="flex-row justify-between mt-2">
                      <Text className="text-muted text-xs">
                        {formatCurrency(goal.currentAmount)}
                      </Text>
                      <Text className="text-muted text-xs">
                        {formatCurrency(goal.targetAmount)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
