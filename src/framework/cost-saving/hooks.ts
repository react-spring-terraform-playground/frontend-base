"use client";

import {
  CsCheckBoxItem,
  CsInputDateItem,
  CsInputDateRangeItem,
  CsInputNumberItem,
  CsInputNumberRangeItem,
  CsInputPasswordItem,
  CsInputTextItem,
  CsItem,
  CsItemBase,
  CsMultiCheckBoxItem,
  CsRadioBoxItem,
  CsSelectBoxItem,
  CsSelectNumberBoxItem,
  CsTextAreaItem,
  CustomValidationRules,
} from ".";
import { Dispatch, SetStateAction, useState } from "react";

export type StateResultOptional<T> = [
  val: T | undefined,
  setVal: Dispatch<SetStateAction<T | undefined>>
];
export type StateResultRequired<T> = [
  val: T,
  setVal: Dispatch<SetStateAction<T>>
];
export type StateResult<T> = StateResultOptional<T>;

export function useInit<T>(value?: T) {
  const state = useState<T | undefined>(value);
  return state;
}

export class SelectOptions {
  options: any[];
  optionValueKey: string = "value";
  optionLabelKey: string = "label";
  constructor(
    options: any[],
    optionValueKey: string = "value",
    optionLabelKey: string = "label"
  ) {
    this.options = options;
    this.optionValueKey = optionValueKey;
    this.optionLabelKey = optionLabelKey;
  }
}

export function selectOptions(
  options: any[],
  optionValueKey: string = "value",
  optionLabelKey: string = "label"
): SelectOptions {
  return new SelectOptions(options, optionValueKey, optionLabelKey);
}

export function selectOptionStrings(options: string[]) {
  return new SelectOptions(options.map((o) => ({ value: o, label: o })));
}

export function selectOptionNumbers(options: number[]) {
  return new SelectOptions(options.map((o) => ({ value: o, label: o })));
}

export enum RW {
  Readonly,
  Editable,
}

export function useCsItem<T, I extends CsItem<T>>(
  type: { new (): I },
  label: string,
  state: StateResult<T>,
  selOpt?: SelectOptions | undefined,
  readonly: RW = RW.Editable
): I {
  const item = new type();
  item.label = label;
  item.setState(state);
  item.setReadonly(readonly === RW.Readonly);
  return item;
}

export function useCsInputTextItem(
  label: string,
  state: StateResult<string>,
  readonly: RW = RW.Editable
): CsInputTextItem {
  return useCsItem(CsInputTextItem, label, state, undefined, readonly);
}

export function useCsInputNumberItem(
  label: string,
  state: StateResult<number>,
  readonly: RW = RW.Editable
): CsInputNumberItem {
  return useCsItem(CsInputNumberItem, label, state, undefined, readonly);
}

export function useCsInputPasswordItem(
  label: string,
  state: StateResult<string>,
  readonly: RW = RW.Editable
): CsInputPasswordItem {
  return useCsItem(CsInputPasswordItem, label, state, undefined, readonly);
}

export function useCsTextAreaItem(
  label: string,
  state: StateResult<string>,
  readonly: RW = RW.Editable
): CsTextAreaItem {
  return useCsItem(CsTextAreaItem, label, state, undefined, readonly);
}

export function useCsCheckBoxItem(
  label: string,
  state: StateResult<boolean>,
  checkBoxText: string,
  readonly: RW = RW.Editable
): CsCheckBoxItem {
  const item = useCsItem(CsCheckBoxItem, label, state, undefined, readonly);
  item.setCheckBoxText(checkBoxText);
  return item;
}

export function useCsSelectBoxItem(
  label: string,
  state: StateResult<string>,
  selOpt: SelectOptions | undefined,
  readonly: RW = RW.Editable
): CsSelectBoxItem {
  return useCsItem(CsSelectBoxItem, label, state, selOpt, readonly);
}

export function useCsSelectNumberBoxItem(
  label: string,
  state: StateResult<number>,
  selOpt: SelectOptions | undefined,
  readonly: RW = RW.Editable
): CsSelectNumberBoxItem {
  return useCsItem(CsSelectNumberBoxItem, label, state, selOpt, readonly);
}

export function useCsRadioBoxItem(
  label: string,
  state: StateResult<string>,
  selOpt: SelectOptions | undefined,
  readonly: RW = RW.Editable
): CsRadioBoxItem {
  return useCsItem(CsRadioBoxItem, label, state, selOpt, readonly);
}

export function useCsMultiCheckBoxItem(
  label: string,
  state: StateResult<string[]>,
  selOpt: SelectOptions | undefined,
  readonly: RW = RW.Editable
): CsMultiCheckBoxItem {
  return useCsItem(CsMultiCheckBoxItem, label, state, selOpt, readonly);
}

export function useRangeInit<T extends number | string>(lower?: T, upper?: T) {
  const state = useState<T[]>([lower as T, upper as T]);
  return state as [
    T[] | undefined,
    Dispatch<React.SetStateAction<T[] | undefined>>
  ];
}

export function useCsInputDateItem(
  label: string,
  state: StateResult<string>,
  readonly: RW = RW.Editable
): CsInputDateItem {
  return useCsItem(CsInputDateItem, label, state, undefined, readonly);
}

export function useCsInputNumberRangeItem(
  label: string,
  state: StateResult<number[]>,
  readonly: RW = RW.Editable
): CsInputNumberRangeItem {
  return useCsItem(CsInputNumberRangeItem, label, state, undefined, readonly);
}

export function useCsInputDateRangeItem(
  label: string,
  state: StateResult<string[]>,
  readonly: RW = RW.Editable
): CsInputDateRangeItem {
  return useCsItem(CsInputDateRangeItem, label, state, undefined, readonly);
}

export type CsViewDefinition = Record<string, CsItemBase>;
export abstract class CsView {
  readonly?: boolean = false;
}

export const useCsView = <
  D extends CsViewDefinition,
  AppValidationRules extends CustomValidationRules
>(
  definitions: D,
  options: {
    readonly?: boolean;
    customValidationRules?: AppValidationRules;
    validationTrigger?: "onSubmit" | "onBlur";
  } = {
    readonly: false,
    customValidationRules: undefined,
    validationTrigger: "onSubmit",
  }
): CsView & D => {
  const instance: CsView & D = {
    ...definitions,
    readonly: options.readonly ?? false,
    validateTrigger: options.validationTrigger,
  };
  Object.entries(definitions).forEach(([key, value]) => {
    if (value instanceof CsItemBase) {
      value.key = key;
      value.parentView = instance;
    }
  });
  return instance;
};
