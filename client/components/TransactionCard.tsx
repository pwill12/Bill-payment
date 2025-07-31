import { Transactions } from "@/types";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, Text, View } from "react-native";

interface TransactionCardProps {
  transactions?: Transactions[];
  loading: boolean;
}

const TransactionCard = ({ transactions, loading }: TransactionCardProps) => {

  const getStatusStyle = (type: Transactions["type"]) => {
    switch (type) {
      case "transfer":
        return "bg-green-300 text-green-900";
      case "data":
        return "bg-blue-300 text-red-900";
      case "airtime":
        return "bg-yellow-300 text-yellow-900";
      default:
        return "bg-gray-300 text-gray-900";
    }
  };

  return (
    <View className="flex-col bg-white rounded-xl">
      {loading ? (
        <View className="flex-1 px-4 justify-center items-center">
          <ActivityIndicator size={"large"} />
          <Text className="mt-4 text-center">loading transactions...</Text>
        </View>
      ) : transactions !== undefined && transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <View
            key={transaction.id}
            className={`p-5 flex-row justify-between ${index === 0 ? "py-4" : ""}`}
          >
            <View className="flex-row items-center gap-2">
              <View className="size-12 justify-center items-center bg-green-100 rounded-full">
                <Feather name="arrow-up" color="green" size={15} />
              </View>
              <View className="flex-col gap-1">
                <Text className="text-sm">{transaction.receiver}</Text>
                <Text className="font-thin text-sm">
                  {transaction.created_at}
                </Text>
              </View>
            </View>
            <View className="flex-col gap-1 items-center">
              <Text className="font-semibold text-xl">
                {transaction.amount}
              </Text>
              <View
                className={`p-1 rounded-3xl ${getStatusStyle(transaction.type)}`}
              >
                <Text className="text-xs font-light">{transaction.type}</Text>
              </View>
            </View>
          </View>
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
