import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { Close } from '@mui/icons-material';

export type AutoCompleteWithChipsProps = {
  name: string;
  defaultValue: string[];
};

export const AutoCompleteWithChips = ({
  name,
  defaultValue,
}: AutoCompleteWithChipsProps) => {
  const { setValue } = useFormContext();

  const [selectedOptions, setSelectedOptions] = useState(defaultValue || []);
  const [inputValue, setInputValue] = useState('');

  const handleAddChip = () => {
    if (
      inputValue.trim() !== '' &&
      !selectedOptions.includes(inputValue.trim())
    ) {
      setSelectedOptions([...selectedOptions, inputValue.trim()]);
      setValue(name, [...selectedOptions, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteChip = (chipToDelete: string) => {
    setValue(name, selectedOptions?.filter((chip) => chip !== chipToDelete));
    setSelectedOptions(
      (chips) => chips?.filter((chip) => chip !== chipToDelete)
    );
  };

  return (
    <Autocomplete
      multiple
      id={`autocomplete_chips_${name.replace(' ', '-')}`}
      freeSolo
      value={selectedOptions}
      options={[]}
      inputValue={inputValue}
      onChange={(event, newValue) => setSelectedOptions(newValue)}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddChip();
            }
          }}
          onBlur={handleAddChip}
          sx={{
            '.MuiOutlinedInput-root': {
              p: '1px',
            },
          }}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            deleteIcon={<Close width={12} height={12} />}
            label={option}
            {...getTagProps({ index })}
            onDelete={() => handleDeleteChip(option)}
            sx={{
              p: '.5rem .75rem',
              m: '2px',
              '.MuiChip-deleteIcon': { m: 'initial' },
              '.MuiChip-label': { pl: '3px' },
            }}
          />
        ))
      }
      ChipProps={{
        sx: {
          padding: '.5rem .75rem',
        },
      }}
    />
  );
};
