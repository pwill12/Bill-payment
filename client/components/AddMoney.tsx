import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
const AddMoney = () => {
  return (
    <TouchableOpacity className="flex-row items-center justify-center bg-white rounded-full py-1 px-2">
      <Feather name="plus" size={17} color={"lightgreen"} />
      <Text className="text-sm color-lime-600">Add Money</Text>
    </TouchableOpacity>
  );
};
export default AddMoney;