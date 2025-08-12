import React from "react";
import TransactionDetails from "@/components/TransactionDetails";
import { useLocalSearchParams } from "expo-router";

const TransactionDetailsPage = () => {
  const params = useLocalSearchParams();
  const param_id = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = parseFloat(param_id);
  console.log(id)
  return <TransactionDetails id={id} />;
};

export default TransactionDetailsPage;
