import { BILLING_ID } from "../constants";

type Props = {
  billingId?: string;
};

export const BillingTable = ({ billingId }: Props) => {
  return (
    <>
      <div>Table ${billingId}</div>
      <div>Table ${BILLING_ID}</div>
    </>
  );
};
