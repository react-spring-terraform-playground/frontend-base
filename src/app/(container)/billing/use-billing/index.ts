"use client";

import { useState } from "react";
import { BillingForm, BillingTable } from "../type";
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

  /**
   * FIXME: オブジェクト配列対応
   */
  const test = useCsView({
    billingId: useCsTextAreaItem("請求ID", useInit("")),
    billingName: useCsTextAreaItem("請求名", useInit("")),
    phone: useCsTextAreaItem("電話番号", useInit("")),
    mail: useCsTextAreaItem("メールアドレス", useInit("")),
  });
  const viewTables = [...Array(3)].map(() => test);
  // viewTables[1].billingName.value
  // 配列用のTableViewを作る

  const [table, setTable] = useState<BillingTable[]>([]);

  const handleBillingId = (index: number) => {
    const func = (value?: string) => {
      setTable(
        table.map((t, i) =>
          i === index ? { ...t, billingId: value ?? "" } : t
        )
      );
    };
    return func;
  };
  const handleBillingName = (index: number) => {
    const func = (value: string) => {
      setTable(
        table.map((t, i) => (i === index ? { ...t, billingName: value } : t))
      );
    };
    return func;
  };
  const handlePhone = (index: number) => {
    const func = (value: string) => {
      setTable(table.map((t, i) => (i === index ? { ...t, phone: value } : t)));
    };
    return func;
  };
  const handleMail = (index: number) => {
    const func = (value: string) => {
      setTable(table.map((t, i) => (i === index ? { ...t, email: value } : t)));
    };
    return func;
  };

  /**
   * FIXME: プロパティ増量中
   */
  const onClick = () => {
    view.billingId.setFixedValue("test1");
    view.billingName.setFixedValue("test2");
    view.phone.setFixedValue("test3");
    view.mail.setFixedValue("test4");
  };

  return {
    view,
    table,
    handleBillingId,
    handleBillingName,
    handlePhone,
    handleMail,
    onClick,
    viewTables,
  };
};
