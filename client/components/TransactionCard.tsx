import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

 interface Transaction {
   id: string;
   description: string;
   timestamp: string;
   amount: string;
   status: 'success' | 'failed' | 'pending';
 }
 
 interface TransactionCardProps {
   transactions?: Transaction[];
 }
 
 const TransactionCard = ({ transactions = [] }: TransactionCardProps) => {
   const defaultTransactions: Transaction[] = [
     {
       id: '1',
       description: 'Transfer to boku store',
       timestamp: 'july 17, 9pm',
       amount: '-$2,000',
       status: 'success'
     },
     {
       id: '2', 
       description: 'Transfer to boku store',
       timestamp: 'july 17, 9pm',
       amount: '-$2,000',
       status: 'failed'
     }
   ];
 
   const transactionList = transactions.length > 0 ? transactions : defaultTransactions;
 
   const getStatusStyle = (status: Transaction['status']) => {
     switch (status) {
       case 'success':
         return 'bg-green-300 text-green-900';
       case 'failed':
         return 'bg-red-300 text-red-900';
       case 'pending':
         return 'bg-yellow-300 text-yellow-900';
       default:
         return 'bg-gray-300 text-gray-900';
     }
   };
 
   return (
     <View className="flex-col bg-white rounded-xl">
       {transactionList.map((transaction, index) => (
         <View 
           key={transaction.id}
           className={`p-5 flex-row justify-between ${index === 0 ? 'py-4' : ''}`}
         >
           <View className="flex-row items-center gap-2">
             <View className="size-12 justify-center items-center bg-green-100 rounded-full">
               <Feather name="arrow-up" color="green" size={15}/>
             </View>
             <View className="flex-col gap-1">
               <Text className="text-sm">{transaction.description}</Text>
               <Text className="font-thin text-sm">{transaction.timestamp}</Text>
             </View>
           </View>
           <View className="flex-col gap-1 items-center">
             <Text className="font-semibold text-xl">{transaction.amount}</Text>
             <View className={`p-1 rounded-3xl ${getStatusStyle(transaction.status)}`}>
               <Text className="text-xs font-light">
                 {transaction.status}
               </Text>
             </View>
           </View>
         </View>
       ))}
       </View>
 )}

export default TransactionCard