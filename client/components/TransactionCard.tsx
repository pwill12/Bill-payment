import { Transactions } from "@/types";
import { formatDate } from "@/utils/dateFormat";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface TransactionCardProps {
  transactions?: Transactions[];
  loading: boolean;
  username: string;
}

const TransactionCard = ({
  transactions,
  loading,
  username,
}: TransactionCardProps) => {
  const getStatusStyle = (type: Transactions["type"]) => {
    switch (type) {
      case "transfer":
        return "bg-green-300 text-green-900";
      case "data":
        return "bg-blue-300 text-red-900";
      case "airtime":
        return "bg-yellow-300 text-yellow-900";
      default:
        return "bg-gray-200 text-gray-50";
    }
  };
  const handlePress = (transaction: Transactions) => {
    if (__DEV__) console.debug("[TransactionCard] id:", transaction.id);
    router.push({
      pathname: "/transaction-details",
      params: {
        id: String(transaction.id),
      },
    });
  };

  return (
    <View className="rounded-xl flex-col">
      {loading ? (
        <View className="flex-1 px-4 justify-center items-center min-h-72">
          <ActivityIndicator size={"large"} />
        </View>
      ) : transactions !== undefined && transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <TouchableOpacity
            key={transaction.id}
            onPress={() => handlePress(transaction)}
          >
            <View
              // key={transaction.id}
              className={`p-5 flex-row justify-between ${index === 0 ? "py-4" : ""}`}
            >
              <View className="flex-row items-center gap-2">
                <View className="size-12 justify-center items-center bg-green-100 rounded-full">
                  <Feather name="arrow-up" color="green" size={15} />
                </View>
                <View className="flex-col gap-1">
                  {transaction.sender === username ? (
                    <Text className="text-sm">
                      Transfer to {transaction.receiver}
                    </Text>
                  ) : (
                    <Text className="text-sm">
                      Received from {transaction.sender}
                    </Text>
                  )}
                  <Text className="font-thin text-sm">
                    {formatDate(transaction.created_at)}
                  </Text>
                </View>
              </View>
              <View className="flex-col gap-1 items-center">
                <View className="flex-row items-center">
                  <Feather name="dollar-sign" />
                  {transaction.sender === username ? (
                    <Text className="text-red-400 font-medium text-xl">
                      -{transaction.amount}
                    </Text>
                  ) : (
                    <Text className="text-green-400 font-medium text-xl">
                      {transaction.amount}
                    </Text>
                  )}
                </View>
                <View
                  className={`p-1 rounded-3xl ${getStatusStyle(transaction.type)}`}
                >
                  <Text className="text-xs font-light px-1">
                    {transaction.type}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View>
          <Text>no transactions</Text>
        </View>
      )}
    </View>
  );
};

export default TransactionCard;
