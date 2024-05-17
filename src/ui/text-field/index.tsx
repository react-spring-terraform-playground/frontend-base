"use client";

import { CsItemBase, CsItem, CsInputTextItem } from "@/framework/cost-saving";
import { Typography, Chip, TextFieldProps, TextField } from "@mui/material";
import { ReactNode, useState, useEffect } from "react";

export interface MxProps<I extends CsItemBase> {
  item: I;
  hideLabel?: boolean;
  labelPlacement?: "top" | "left";
  labelWidth?: 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50;
  showRequiredTag?: "both" | "required" | "optional" | "none";
  addClassNames?: string[];
}

interface MxLabelProp {
  label: string | ReactNode;
  color?: string;
}

export const MxLabel = (props: MxLabelProp) => {
  const color = props.color ?? "#196e0bda";
  return (
    <div className="label">
      <Typography variant="subtitle2" style={{ color: color }}>
        {props.label}
      </Typography>
    </div>
  );
};

export const getClassName = <T,>(
  props: MxProps<CsItem<T>>,
  add?: string
): string => {
  let names = ["mui-ctrl"];
  const item = props.item;
  if (add) {
    names.push(add);
  }
  if (props.addClassNames) {
    names = names.concat(props.addClassNames);
  }
  if (item.isReadonly()) {
    names.push("readonly");
  }
  return names.join(" ");
};

export const getLabel = <T,>(
  item: CsItem<T>,
  showRequiredTag?: "both" | "required" | "optional" | "none"
): ReactNode => {
  const required = true; // FIXME:
  const showTag = showRequiredTag ?? (item.parentView ? "both" : "none");
  const requiredTag = () => {
    switch (showTag) {
      case "both":
        return (
          <Chip
            variant="outlined"
            color={required ? "error" : "default"}
            label={required ? "必須" : "任意"}
          />
        );
      case "required":
        return (
          required && (
            <Chip
              variant="outlined"
              size="small"
              color="error"
              label={"必須"}
            />
          )
        );
      case "optional":
        return (
          !required && (
            <Chip
              variant="outlined"
              size="small"
              color="default"
              label={"任意"}
            />
          )
        );
    }
  };
  return (
    <span>
      {item.label}
      {requiredTag()}
    </span>
  );
};

export interface MxEditCtrlProps<T extends CsItemBase> {
  mxProps: MxProps<T>;
  renderCtrl: (
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  ) => ReactNode;
}

export const MxEditCtrl = <T,>(props: MxEditCtrlProps<CsItem<T>>) => {
  const { mxProps, renderCtrl } = props;
  const { item, showRequiredTag } = mxProps;
  const hideLabel = mxProps.hideLabel ?? false;
  const labelPlacement = mxProps.labelPlacement ?? "top";
  const labelWidth = mxProps.labelWidth ?? 30;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  return labelPlacement === "left" ? (
    <div>
      <div className={"input-container"}>
        {hideLabel ? (
          <div style={{ width: "100%" }}>{renderCtrl(setRefresh)}</div>
        ) : (
          <>
            <div style={{ width: labelWidth + "%" }}>
              <MxLabel label={getLabel(item, showRequiredTag)}></MxLabel>
            </div>
            <div style={{ width: 100 - labelWidth + "%" }}>
              {renderCtrl(setRefresh)}
            </div>
            <Typography color="black">{item.fixedValue}</Typography>
          </>
        )}
      </div>
    </div>
  ) : (
    <>
      {!hideLabel && (
        <MxLabel label={getLabel(item, showRequiredTag)}></MxLabel>
      )}
      {renderCtrl(setRefresh)}
      <Typography color="black">{item.fixedValue}</Typography>
    </>
  );
};

export interface MxInputTextProps extends MxProps<CsInputTextItem> {
  muiProps?: TextFieldProps;
}

export const MxInputText = (props: MxInputTextProps) => {
  const { item, muiProps } = props;
  return (
    <MxEditCtrl
      mxProps={props}
      renderCtrl={(setRefresh) => (
        <>
          <TextField
            className={getClassName(props)}
            value={item.value}
            inputProps={{ readOnly: item.isReadonly() }}
            onChange={(e: any) => {
              item.setValue(e.target.value);
            }}
            {...muiProps}
          />
        </>
      )}
    />
  );
};
