"use client";

import { BillingTable } from "./billing-table";
import { useBilling } from "./use-billing";

const Page = () => {
  const billing = useBilling();

  return <BillingTable {...billing} />;
};

export default Page;
