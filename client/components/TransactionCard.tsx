import { Transactions } from "@/types";
import { formatDate } from "@/utils/dateFormat";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TransactionCardProps {
  transactions?: Transactions[];
  loading?: boolean;
  username: string;
  loadpage?: () => void;
  showload?: boolean;
  loadmore?: boolean;
  lastindex?: boolean;
}

const TransactionCard = ({
  transactions,
  loading,
  username,
  loadpage,
  showload,
  loadmore,
  lastindex
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

  const { height } = Dimensions.get("screen");

  return (
    <ScrollView
      style={{ maxHeight: height * 0.76 }}
      showsVerticalScrollIndicator={false}
      // onScrollEndDrag={}
    >
      <View className="rounded-xl flex-col bg-white">
        {loading ? (
          <View className="px-4 justify-center items-center bg-gray-50">
            <ActivityIndicator size={"large"} />
          </View>
        ) : transactions !== undefined && transactions.length > 0 ? (
          <View>
            {transactions.map((transaction, index) => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() => handlePress(transaction)}
              >
                <View
                  className={`p-3 flex-row justify-between ${index === 0 ? "py-4" : ""}`}
                >
                  <View className="flex-row items-center gap-2">
                    <View className="size-12 justify-center items-center bg-green-100 rounded-full">
                      {transaction.sender === username ? (
                        <Feather name="arrow-up" color="green" size={15} />
                      ) : (
                        <Feather name="arrow-down" color="green" size={15} />
                      )}
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
            ))}
            {showload && loadpage ? (
              <TouchableOpacity
                className="flex-row items-center gap-2 py-1 justify-center border border-gray-100 w-32 self-center mb-4 rounded-lg"
                onPress={loadpage}
                disabled={loadmore || transactions.length === 3}
              >
                {loadmore ? (
                  <View className="px-4 justify-center items-center">
                    <ActivityIndicator size={"small"} />
                  </View>
                ) : transactions.length === 3 ? (
                  <View>
                    <Text>no more data</Text>
                  </View>
                ) : (
                  <>
                    <Feather name="search" />
                    <Text className="text-sm">load more</Text>
                  </>
                )}
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
          <View className="items-center bg-gray-50">
            <Text>no transactions</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default TransactionCard;
