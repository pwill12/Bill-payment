import React from "react";
import TransactionDetails from "@/components/TransactionDetails";
import { useLocalSearchParams } from "expo-router";

const TransactionDetailsPage = () => {
  const params = useLocalSearchParams();
  const param_id = Array.isArray(params.id) ? params.id[0] : params.id;
  const id =
    typeof param_id === "string" && param_id.trim() !== ""
      ? Number(param_id)
      : undefined;
  if (__DEV__) console.debug("[TransactionDetailsPage] id:", id);
  return <TransactionDetails id={id} />;

};

export default TransactionDetailsPage;
