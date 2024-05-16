import { CsRadioBoxItem } from "@/framework/cost-saving";
import {
  RadioGroupProps,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { MxProps, MxEditCtrl, getClassName } from "../text-field";

export interface MxRadioBoxProps extends MxProps<CsRadioBoxItem> {
  muiProps?: RadioGroupProps & React.RefAttributes<HTMLDivElement>;
}

export const MxRadioBox = (props: MxRadioBoxProps) => {
  const { item, muiProps } = props;
  return (
    <MxEditCtrl
      mxProps={props}
      renderCtrl={(setRefresh) => (
        <FormControl id={item.key}>
          <RadioGroup
            className={getClassName(props, "fit-content")}
            row
            value={item.value}
            name={"radio-group-" + item.key}
            onChange={(e, value: string) => {
              if (item.isReadonly()) return;
              item.setValue(value);
            }}
            {...muiProps}
          >
            {item.options.map((o) => {
              const selected = o[item.optionValueKey] === item.value;
              return (
                <FormControlLabel
                  key={o[item.optionValueKey]}
                  value={o[item.optionValueKey]}
                  control={
                    <Radio
                      key={o[item.optionValueKey]}
                      readOnly={item.isReadonly()}
                      disabled={item.isReadonly() && !selected}
                    />
                  }
                  label={o[item.optionLabelKey]}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      )}
    /> // MxEditCtrl
  );
};
