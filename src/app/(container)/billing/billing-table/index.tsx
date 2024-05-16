import { MxTableLayout } from "@/ui/view-table";
import { BILLING_ID } from "../constants";
import { useBilling } from "../use-billing";

type Props = ReturnType<typeof useBilling>;

export const BillingTable = ({ view }: Props) => {
  return (
    <>
      <MxTableLayout view={view} colSize={4} />
    </>
  );
};
