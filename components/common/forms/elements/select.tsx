import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import React from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormRegisterReturn,
  useFormContext,
} from 'react-hook-form';

export type SelectElementProps = {
  name: string;
  items: { label?: string; value: string }[];
  label?: string;
  helperText?: string;
  multiple?: boolean;
  value: string | string[];
  field?: ControllerRenderProps<FieldValues, string>;
  register?: UseFormRegisterReturn;
  defaultValue: any;
};

export const SelectElement: React.FC<SelectElementProps> = ({
  field,
  name,
  value,
  label,
  items,
  multiple,
  defaultValue,
}) => {
  const { setValue } = useFormContext();

  return (
    <Select
      labelId={`form-field--label_${name.replace(' ', '-')}`}
      id={`form-field--select_${name.replace(' ', '-')}`}
      className={
        (Array.isArray(value) ? value.length > 0 : value)
          ? 'has-selected-value'
          : undefined
      }
      defaultValue={multiple ? [] : defaultValue}
      input={
        <OutlinedInput
          id={`form-field--input_${name.replace(' ', '-')}`}
          label={label}
          sx={{
            '&.has-selected-value .MuiSelect-multiple': {
              py: 1.5,
            },
          }}
        />
      }
      renderValue={(selected: string | string[]) =>
        Array.isArray(selected) ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        ) : (
          selected
        )
      }
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
        elevation: 1,
      }}
      multiple={multiple}
    >
      {items.map(({ value, label }, idx) => (
        <MenuItem
          key={`${value}_${idx}`}
          value={value}
          onClick={() => {
            console.log({ name, value });
            setValue(name, value);
          }}
        >
          {label ?? value}
        </MenuItem>
      ))}
    </Select>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
