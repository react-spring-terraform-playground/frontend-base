import { CsInputNumberItem } from "@/framework/cost-saving";
import { TextFieldProps, TextField } from "@mui/material";
import { MxProps, MxEditCtrl, getClassName } from "../text-field";

export interface MxInputNumberProps extends MxProps<CsInputNumberItem> {
  muiProps?: TextFieldProps;
}

export const MxInputNumber = (props: MxInputNumberProps) => {
  const { item, muiProps } = props;
  return (
    <MxEditCtrl
      mxProps={props}
      renderCtrl={(setRefresh) => (
        <TextField
          className={getClassName(props, "input-number")}
          value={item.value}
          inputProps={{
            readOnly: item.isReadonly(),
          }}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            const re = /^-?[0-9]+$/g;
            const newValue =
              e.target.value.length === 0 ? undefined : e.target.value;
            if (newValue === undefined || re.test(newValue)) {
              const newNumber = newValue ? Number(newValue) : undefined;
              item.setValue(newNumber);
            }
          }}
          {...muiProps}
        />
      )}
    />
  );
};
