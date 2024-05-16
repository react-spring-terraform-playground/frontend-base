import { CsTextAreaItem } from "@/framework/cost-saving";
import { TextFieldProps, TextField } from "@mui/material";
import { MxProps, MxEditCtrl, getClassName } from "../text-field";

export interface MxTextAreaProps extends MxProps<CsTextAreaItem> {
  muiProps?: TextFieldProps;
}

export const MxTextArea = (props: MxTextAreaProps) => {
  const { item, muiProps } = props;
  return (
    <MxEditCtrl
      mxProps={props}
      renderCtrl={(setRefresh) => (
        <TextField
          className={getClassName(props, "textarea")}
          value={item.value}
          inputProps={{
            readOnly: item.isReadonly(),
            // https://github.com/mui/base-ui/issues/167
            inputComponent: "textarea",
          }}
          // Do not use multiline till this issue fixed ... https://github.com/mui/base-ui/issues/167
          // multiline
          // minRows={4}
          variant="outlined"
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
