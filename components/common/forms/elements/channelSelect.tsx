import type Eris from '@dynogg/eris';

import React, { useMemo, useRef } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { type UseFormRegisterReturn, useFormContext } from 'react-hook-form';

import { DiscordChannelIcon } from '#components/common/icons/discordChannel';
import { useChannels } from '#hooks/data/useChannels';
import { ChannelType } from '#types/discord/channel';

type ValueType = {
  id: string;
  name: string;
};

export type ChannelSelectElementProps = {
  name: string;
  label?: string;
  helperText?: string;
  multiple?: boolean;
  allowedTypes?: ChannelType[];
  notSearchable?: boolean;
  notClearable?: boolean;
  notGrouped?: boolean;
  includeCategories?: boolean;
  value: string | string[];
  defaultValue?: ValueType[];
  placeholder?: string;
  register?: UseFormRegisterReturn;
  onChange?: (_value: ValueType[]) => void;
};

export const ChannelSelectElement: React.FC<ChannelSelectElementProps> = ({
  multiple,
  register,
  label,
  name,
  allowedTypes,
  includeCategories,
  notClearable,
  notGrouped,
  helperText,
  value,
  placeholder,
  defaultValue,
}) => {
  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;
  const { channels } = useChannels();
  const { setValue } = useFormContext();

  const filteredChannels = useMemo(
    () =>
      channels.filter((c) => {
        const conditions: boolean[] = [];

        if (includeCategories) {
          conditions.push(
            includeCategories
              ? c.id !== null && c.id !== undefined
              : c.parentID !== null && c.parentID !== undefined
          );
        }

        if (allowedTypes?.length) {
          conditions.push(allowedTypes.some((type) => type === c.type));
        }

        return conditions.every((c) => c);
      }),
    [channels, allowedTypes, includeCategories]
  );

  const defaultOptions = channels.filter(
    (channel) =>
      defaultValueRef.current?.some(
        (defaultChannel) => defaultChannel?.id === channel.id
      )
  );

  return !channels.length ? null : (
    <Autocomplete
      {...register}
      id={`form-element--input_${name.replace(' ', '-')}`}
      placeholder={placeholder}
      options={filteredChannels}
      defaultValue={multiple ? defaultOptions : defaultOptions[0]}
      getOptionLabel={(channel: Eris.GuildChannel) => channel.name}
      multiple={multiple}
      onChange={(_, value?: Eris.GuildChannel | Eris.GuildChannel[] | null) => {
        if (!value) {
          return;
        }

        if (isMultiple(value)) {
          setValue(name, {
            channels: value.map((channel) => ({
              id: channel.id,
              name: channel.name,
            })),
          });
          return;
        }

        setValue(name, { channels: [{ id: value?.id, name: value?.name }] });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          helperText={helperText}
          placeholder={placeholder}
        />
      )}
      renderOption={(props, item) => {
        if (
          !item ||
          (!includeCategories && item.type === ChannelType.GUILD_CATEGORY)
        ) {
          return value;
        }

        return (
          <Box component='li' {...props}>
            <DiscordChannelIcon
              channelType={item?.type}
              sx={{ mr: 0.5, flexShrink: 0 }}
            />
            {item.name}
          </Box>
        );
      }}
      ChipProps={{
        sx: {
          padding: '.5rem .75rem',
        },
      }}
      disableClearable={notClearable}
      groupBy={
        notGrouped
          ? undefined
          : (currentChannel) => {
              const channel = channels.find((c) => c.id === currentChannel.id);

              if (channel?.parentID) {
                const category = channels.find(
                  (c) => c.id === channel.parentID
                );

                if (category) {
                  return category.name;
                }
              }

              return '';
            }
      }
    />
  );
};

function isMultiple(
  channel: Eris.GuildChannel | Eris.GuildChannel[]
): channel is Eris.GuildChannel[] {
  return Array.isArray(channel);
}
