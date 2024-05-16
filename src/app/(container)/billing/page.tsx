"use client";

import { BillingTable } from "./billing-table";
import { useBilling } from "./use-billing";

const Page = () => {
  const { view } = useBilling();

  return <BillingTable view={view} />;
};

export default Page;
