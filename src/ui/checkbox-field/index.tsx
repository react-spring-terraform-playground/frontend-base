import { CsCheckBoxItem } from "@/framework/cost-saving";
import {
  CheckboxProps,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { MxProps, MxEditCtrl, getClassName } from "../text-field";

export interface MxCheckBoxProps extends MxProps<CsCheckBoxItem> {
  muiProps?: CheckboxProps;
}

export const MxCheckBox = (props: MxCheckBoxProps) => {
  const { item, muiProps } = props;
  return (
    <MxEditCtrl
      mxProps={props}
      renderCtrl={(setRefresh) => (
        <div className={getClassName(props, "fit-content")}>
          <FormGroup className="checkbox-item">
            <FormControlLabel
              control={
                <Checkbox
                  className="checkbox-item"
                  value={item.value}
                  checked={item.value}
                  onChange={(e, checked) => {
                    if (item.isReadonly()) return;
                    item.setValue(checked);
                  }}
                  {...muiProps}
                />
              }
              label={item.checkBoxText}
            />
          </FormGroup>
        </div>
      )}
    />
  );
};
