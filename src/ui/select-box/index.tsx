import {
  CsHasOptionsItem,
  CsSelectBoxItem,
  CsSelectNumberBoxItem,
} from "@/framework/cost-saving";
import {
  SelectProps,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { MxProps, MxEditCtrl, getClassName } from "../text-field";

interface MxSelectBoxCommonProps<
  V extends string | number,
  T extends CsHasOptionsItem<V>
> extends MxProps<T> {
  muiProps?: SelectProps<V>;
}

const MxSelectBoxCommon = <
  V extends string | number,
  T extends CsHasOptionsItem<V>
>(
  props: MxSelectBoxCommonProps<V, T>,
  toValue: (value: string) => V | undefined
) => {
  const { item, muiProps } = props;
  return (
    <MxEditCtrl
      mxProps={props}
      renderCtrl={(setRefresh) => (
        <Select
          className={getClassName(props, "fit-content")}
          value={item.value}
          onChange={(e: SelectChangeEvent<V>) => {
            const newValue = e.target.value ? e.target.value.toString() : "";
            item.setValue(toValue(newValue));
          }}
          {...muiProps}
        >
          {item.options.map((o) => {
            return !item.isReadonly() ||
              (item.isReadonly() && item.value === o[item.optionValueKey]) ? (
              <MenuItem
                key={o[item.optionValueKey]}
                value={o[item.optionValueKey]}
              >
                {o[item.optionLabelKey]}
              </MenuItem>
            ) : null;
          })}
        </Select>
      )}
    />
  );
};
export interface MxSelectBoxProps
  extends MxSelectBoxCommonProps<string, CsSelectBoxItem> {
  muiProps?: SelectProps<string>;
}

export const MxSelectBox = (props: MxSelectBoxProps) => {
  return MxSelectBoxCommon<string, CsSelectBoxItem>(
    props,
    (value: string) => value
  );
};

export interface MxSelectNumberBoxProps
  extends MxSelectBoxCommonProps<number, CsSelectNumberBoxItem> {
  muiProps?: SelectProps<number>;
}

export const MxSelectNumberBox = (props: MxSelectNumberBoxProps) => {
  return MxSelectBoxCommon<number, CsSelectNumberBoxItem>(
    props,
    (value: string) => Number(value)
  );
};
