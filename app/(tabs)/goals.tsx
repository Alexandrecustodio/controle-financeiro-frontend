import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useGoals } from "@/lib/goals-context";
import { useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { useColors } from "@/hooks/use-colors";

type GoalStatusFilter = "active" | "completed" | "abandoned";

export default function GoalsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { goals } = useGoals();
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<GoalStatusFilter>("active");

  const filteredGoals = goals.filter((g) => g.status === statusFilter);

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

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: "Ativas",
      completed: "Concluídas",
      abandoned: "Abandonadas",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return colors.primary;
      case "completed":
        return colors.success;
      case "abandoned":
        return colors.error;
      default:
        return colors.foreground;
    }
  };

  return (
    <ScreenContainer className="p-0">
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <>
            {/* Status Filter */}
            <View className="px-6 py-4 gap-3">
              <View className="flex-row gap-2">
                {(["active", "completed", "abandoned"] as GoalStatusFilter[]).map((status) => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => setStatusFilter(status)}
                    className="flex-1 py-2 rounded-lg border"
                    style={{
                      backgroundColor:
                        statusFilter === status
                          ? getStatusColor(status)
                          : "transparent",
                      borderColor:
                        statusFilter === status
                          ? getStatusColor(status)
                          : colors.border,
                    }}
                  >
                    <Text
                      className="text-center font-semibold text-sm"
                      style={{
                        color:
                          statusFilter === status
                            ? colors.background
                            : colors.foreground,
                      }}
                    >
                      {getStatusLabel(status)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => router.push("/add-goal")}
                className="bg-primary rounded-xl py-3 items-center"
              >
                <Text className="text-white font-semibold">+ Criar Meta</Text>
              </TouchableOpacity>
            </View>

            {/* Goal Count */}
            {filteredGoals.length > 0 && (
              <View className="px-6 pb-3">
                <Text className="text-muted text-sm">
                  {filteredGoals.length} meta{filteredGoals.length !== 1 ? "s" : ""}
                </Text>
              </View>
            )}
          </>
        }
        data={filteredGoals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const progress = (item.currentAmount / item.targetAmount) * 100;
          const daysLeft = Math.ceil(
            (new Date(item.targetDate).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <View className="px-6 mb-3">
              <TouchableOpacity
                onPress={() => router.push(`/goal-details?id=${item.id}`)}
                className="bg-surface rounded-xl p-4 border"
                style={{ borderColor: colors.border }}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-foreground font-semibold flex-1">
                    {item.name}
                  </Text>
                  <Text className="text-muted text-xs">
                    {Math.round(progress)}%
                  </Text>
                </View>

                {/* Progress Bar */}
                <View
                  className="h-2 bg-border rounded-full overflow-hidden mb-3"
                  style={{ backgroundColor: colors.border }}
                >
                  <View
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: colors.primary,
                    }}
                  />
                </View>

                {/* Amount Info */}
                <View className="flex-row justify-between mb-2">
                  <Text className="text-muted text-xs">
                    {formatCurrency(item.currentAmount)}
                  </Text>
                  <Text className="text-muted text-xs">
                    {formatCurrency(item.targetAmount)}
                  </Text>
                </View>

                {/* Deadline */}
                <Text className="text-muted text-xs">
                  {daysLeft > 0
                    ? `${daysLeft} dias restantes`
                    : daysLeft === 0
                      ? "Vence hoje"
                      : "Vencido"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Text className="text-muted text-lg">
              Nenhuma meta {getStatusLabel(statusFilter).toLowerCase()}
            </Text>
          </View>
        }
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      />
    </ScreenContainer>
  );
}
