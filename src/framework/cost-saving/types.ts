import { Dispatch, SetStateAction } from "react";
import { CsView } from ".";
import { StateResult } from ".";

export abstract class CsItemBase {
  label: string = "";
  key: string = "";
  private readonly: boolean = false;
  parentView?: CsView;
  isReadonly() {
    return this.readonly ? this.readonly : this.parentView?.readonly ?? false;
  }
  setReadonly = (value: boolean) => {
    this.readonly = value;
  };
}
type CustomValidator<T> = (newValue: T | undefined, item: CsItem<T>) => boolean;

type CustomValidateMessage<T> =
  | ((label: string, value: T, item: CsItem<T>) => string)
  | string;

export class CustomValidationRule<T> {
  validator: CustomValidator<T>;
  message: CustomValidateMessage<T>;
  constructor(
    validator: CustomValidator<T>,
    message: CustomValidateMessage<T>
  ) {
    this.validator = validator;
    this.message = message;
  }
}

export type CustomValidationRules = {
  [key: string]:
    | CustomValidationRule<string>
    | CustomValidationRule<number>
    | CustomValidationRule<boolean>
    | CustomValidationRule<string[]>
    | CustomValidationRule<number[]>;
};

export const createRegExpValidator = (
  pattern: RegExp
): CustomValidator<string> => {
  return (newValue: string | undefined, item: CsItem<string>) =>
    pattern.test(newValue ?? "");
};

export const customValidationRule = <T>(
  validator: CustomValidator<T>,
  message: CustomValidateMessage<T>
) => {
  return new CustomValidationRule(validator, message);
};

// eslint-disable-next-line
export class ValidationRule<T> {
  required: boolean = false;
  customRuleName?: string;
  setRequired = (required: boolean = true) => {
    this.required = required;
    return this;
  };
  setCustomRuleName = (name: string) => {
    this.customRuleName = name;
    return this;
  };
}

export class BooleanValidationRule extends ValidationRule<boolean> {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: BooleanValidationRule;
}

export class NumberValidationRule extends ValidationRule<number> {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: NumberValidationRule;
  min: number | undefined;
  max: number | undefined;
  setRange = (
    min: number | undefined = Number.MAX_SAFE_INTEGER,
    max: number | undefined = Number.MAX_SAFE_INTEGER
  ) => {
    this.min = min;
    this.max = max;
    return this;
  };
}

export class StringValidationRule extends ValidationRule<string> {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: StringValidationRule;
  min: number | undefined;
  max: number | undefined;
  email: boolean = false;
  regExp: string | undefined;
  setLength = (
    min: number | undefined = 0,
    max: number | undefined = Number.MAX_SAFE_INTEGER
  ) => {
    this.min = this.required && min === 0 ? 1 : min;
    this.max = max;
    return this;
  };
  setRegExp = (regExp: string) => {
    this.regExp = regExp;
    return this;
  };
  setEmail = (b: boolean = true) => {
    this.email = b;
    return this;
  };
}
export class StringArrayValidationRule extends ValidationRule<string[]> {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: StringArrayValidationRule;
}

export class NumberArrayValidationRule extends ValidationRule<number[]> {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: NumberArrayValidationRule;
}

export type SetValueTypeRequired<T> = Dispatch<SetStateAction<T>>;
export type SetValueTypeOptional<T> = Dispatch<SetStateAction<T | undefined>>;
export type ValueType<T> = T | undefined;

export abstract class CsItem<T> extends CsItemBase {
  value: T | undefined = undefined;
  fixedValue: string | undefined = undefined;
  protected setValueOpt: SetValueTypeOptional<T> =
    {} as SetValueTypeOptional<T>;
  protected setFixedValueOpt: SetValueTypeOptional<string> =
    {} as SetValueTypeOptional<string>;
  init = (label: string, readonly: boolean = false) => {
    this.label = label;
    this.setReadonly(readonly);
    return this;
  };

  setState = (state: StateResult<T>) => {
    this.value = state[0];
    this.setValueOpt = state[1];
    return this;
  };

  setValue = (value?: T) => {
    this.setValueOpt(value);
  };

  setFixedState = (state: StateResult<string>) => {
    this.fixedValue = state[0];
    this.setFixedValueOpt = state[1];
    return this;
  };

  setFixedValue = (value?: string) => {
    this.setFixedValueOpt(value);
  };
}

export class CsStringItem extends CsItem<string> {
  private itemIdentifier?: CsStringItem;
}

export class CsNumberItem extends CsItem<number> {
  private itemIdentifier?: CsNumberItem;
}

export class CsStringArrayItem extends CsItem<string[]> {
  private itemIdentifier?: CsStringArrayItem;
}

export class CsNumberArrayItem extends CsItem<number[]> {
  private itemIdentifier?: CsNumberArrayItem;
}

export class CsBooleanItem extends CsItem<boolean> {
  private itemIdentifier?: CsBooleanItem;
}

export class CsInputTextItem extends CsStringItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsInputTextItem;
}

export class CsInputNumberItem extends CsNumberItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsInputNumberItem;
}

export class CsInputPasswordItem extends CsStringItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsInputPasswordItem;
}

export class CsTextAreaItem extends CsStringItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsTextAreaItem;
}

export class CsCheckBoxItem extends CsBooleanItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsCheckBoxItem;
  checkBoxText: string = "";
  setCheckBoxText = (checkBoxText: string) => {
    this.checkBoxText = checkBoxText;
  };
  isChecked(): boolean {
    return this.value ?? false;
  }
}

export abstract class CsHasOptionsItem<T> extends CsItem<T> {
  options: any[] = [];
  optionValueKey: string = "value";
  optionLabelKey: string = "label";
  setOptions = (
    options: any[],
    optionValueKey: string,
    optionLabelKey: string
  ) => {
    this.options = options;
    this.optionValueKey = optionValueKey;
    this.optionLabelKey = optionLabelKey;
    return this;
  };
}

export abstract class CsStringArrayOptionsItem extends CsHasOptionsItem<
  string[]
> {
  private itemIdentifier?: CsStringArrayOptionsItem;
}

export abstract class CsNumberArrayOptionsItem extends CsHasOptionsItem<
  string[]
> {
  private itemIdentifier?: CsNumberArrayOptionsItem;
}

export abstract class CsStringOptionsItem extends CsHasOptionsItem<string> {
  private itemIdentifier?: CsStringOptionsItem;
}

export abstract class CsNumberOptionsItem extends CsHasOptionsItem<number> {
  private itemIdentifier?: CsNumberOptionsItem;
}

export class CsMultiCheckBoxItem extends CsStringArrayOptionsItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsMultiCheckBoxItem;
  getCheckedValues(): string[] {
    return this.value ?? [];
  }
  getCheckedOption(): any[] {
    return this.options.filter((o) =>
      this.value?.includes(o[this.optionValueKey])
    );
  }
}

export class CsSelectBoxItem extends CsStringOptionsItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsSelectBoxItem;
}

export class CsSelectNumberBoxItem extends CsNumberOptionsItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsSelectNumberBoxItem;
}

export class CsRadioBoxItem extends CsStringOptionsItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsRadioBoxItem;
}

export class CsInputDateItem extends CsStringItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsInputDateItem;

  static dateValueFormat: string = "YYYY-MM-DDTHH:mm:ssZ";
  static dateDisplayFormat: string = "YYYY/MM/DD";
  static dateTimeValueFormat: string = "YYYY-MM-DDTHH:mm:ssZ";
  static dateTimeDisplayFormt: string = "YYYY/MM/DD HH:mm:ss";

  displayFormat: string = CsInputDateItem.dateDisplayFormat;
  valueFormat: string = CsInputDateItem.dateValueFormat;
}

export abstract class CsRangeItem<
  V extends string | number,
  T extends V[],
> extends CsItem<T> {
  get lowerValue() {
    if (this.value && this.value.length === 2) {
      return this.value[0];
    }
    return undefined;
  }

  setLowerValue = (value: V | undefined) => {
    this.setValue([value, this.upperValue] as T);
  };

  get upperValue() {
    if (this.value && this.value.length === 2) {
      return this.value[1];
    }
    return undefined;
  }

  setUpperValue = (value: V | undefined) => {
    this.setValue([this.lowerValue, value] as T);
  };

  setRangeValue = (lower: V | undefined, upper: V | undefined) => {
    this.setValue([lower, upper] as T);
  };
}

export class CsNumberRangeItem extends CsRangeItem<number, number[]> {
  private itemIdentifier?: CsNumberRangeItem;
}

export class CsInputNumberRangeItem extends CsNumberRangeItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsInputNumberRangeItem;
}

export class CsStringRangeItem extends CsRangeItem<string, string[]> {
  private itemIdentifier?: CsStringRangeItem;
}

export class CsInputDateRangeItem extends CsStringRangeItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsInputNumberRangeItem;

  displayFormat: string = CsInputDateItem.dateDisplayFormat;
  valueFormat: string = CsInputDateItem.dateValueFormat;
}
