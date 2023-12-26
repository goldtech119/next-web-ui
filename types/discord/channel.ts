// https://discord.com/developers/docs/resources/channel#channel-object-channel-types

export enum ChannelType {
    GUILD_TEXT = 0, // A text channel within a server
    DM = 1, // A direct message between users
    GUILD_VOICE = 2, // A voice channel within a server
    GROUP_DM = 3, // A direct message between multiple users
    GUILD_CATEGORY = 4, // An organizational category that contains up to 50 channels
    GUILD_ANNOUNCEMENT = 5, // A channel that users can follow and crosspost into their own server (formerly news channels)
    ANNOUNCEMENT_THREAD = 10, // A temporary sub-channel within a GUILD_ANNOUNCEMENT channel
    PUBLIC_THREAD = 11, // A temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel
    PRIVATE_THREAD = 12, // A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission
    GUILD_STAGE_VOICE = 13, // A voice channel for hosting events with an audience
    GUILD_DIRECTORY = 14, // The channel in a hub containing the listed servers
    GUILD_FORUM = 15, // Channel that can only contain threads
  }

