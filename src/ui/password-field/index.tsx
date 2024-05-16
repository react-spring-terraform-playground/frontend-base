import { CsInputPasswordItem } from "@/framework/cost-saving";
import { TextFieldProps, TextField } from "@mui/material";
import { MxProps, MxEditCtrl, getClassName } from "../text-field";

export interface MxInputPasswordProps extends MxProps<CsInputPasswordItem> {
  muiProps?: TextFieldProps;
}

export const MxInputPassword = (props: MxInputPasswordProps) => {
  const { item, muiProps } = props;
  return (
    <MxEditCtrl
      mxProps={props}
      renderCtrl={(setRefresh) => (
        <TextField
          className={getClassName(props)}
          value={item.value}
          inputProps={{
            readOnly: item.isReadonly(),
          }}
          type="password"
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            item.setValue(e.target.value);
          }}
          {...muiProps}
        />
      )}
    />
  );
};
