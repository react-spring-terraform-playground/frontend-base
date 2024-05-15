import { BillingTable } from "./billing-table";
import { useBilling } from "./use-billing";

const Page = () => {
  const { billing } = useBilling();

  return <BillingTable billingId={billing?.billingId} />;
};

export default Page;
