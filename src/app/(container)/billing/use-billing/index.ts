import { useState } from "react";
import { BillingForm } from "../type";

export const useBilling = () => {
  const [billing, setBilling] = useState<BillingForm>();

  return { billing };
};
