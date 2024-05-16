import { CsMultiCheckBoxItem } from "@/framework/cost-saving";
import {
  CheckboxProps,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { MxProps, MxEditCtrl, getClassName } from "../text-field";

export interface MxMultiCheckBoxProps extends MxProps<CsMultiCheckBoxItem> {
  muiProps?: CheckboxProps;
}

export const MxMultiCheckBox = (props: MxMultiCheckBoxProps) => {
  const { item, muiProps } = props;
  return (
    <MxEditCtrl
      mxProps={props}
      renderCtrl={(setRefresh) => (
        <div className={getClassName(props, "fit-content")}>
          <FormGroup className="checkbox-group" onBlur={() => {}}>
            {item.options.map((o) => {
              const value = o[item.optionValueKey];
              const text = o[item.optionLabelKey];
              return (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      className="checkbox-item"
                      key={value}
                      value={value}
                      checked={item.value?.includes(value)}
                      onChange={(e, checked) => {
                        if (item.isReadonly()) return;
                        let newValue: string[];
                        if (checked) {
                          newValue = item.value
                            ? item.value?.concat(value)
                            : [];
                        } else {
                          newValue = item.value
                            ? item.value?.filter((v) => v !== value)
                            : [];
                        }
                        item.setValue(newValue);
                      }}
                      disabled={
                        item.isReadonly() && !item.value?.includes(value)
                      }
                      {...muiProps}
                    />
                  }
                  label={text}
                />
              );
            })}
          </FormGroup>
        </div>
      )}
    />
  );
};
