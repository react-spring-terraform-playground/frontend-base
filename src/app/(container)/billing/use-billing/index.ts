"use client";

import { useState } from "react";
import { BillingForm } from "../type";
import {
  CsInputTextItem,
  CsView,
  useCsTextAreaItem,
  useCsView,
  useInit,
} from "@/framework/cost-saving";

type BillingView = CsView & {
  billingId: CsInputTextItem;
  billingName: CsInputTextItem;
  phone: CsInputTextItem;
  mail: CsInputTextItem;
};

export const useBilling = () => {
  const [billing, setBilling] = useState<BillingForm>();

  const view = useCsView({
    billingId: useCsTextAreaItem("請求ID", useInit("")),
    billingName: useCsTextAreaItem("請求名", useInit("")),
    phone: useCsTextAreaItem("電話番号", useInit("")),
    mail: useCsTextAreaItem("メールアドレス", useInit("")),
  });

  return { view };
};
