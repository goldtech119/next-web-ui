export const routes = {
  discordAvatar: (id: string, avatar: string, animate = true) =>
    `https://cdn.discordapp.com/avatars/${id}/${avatar}${
      animate ? "" : ".png"
    }`,
  discordAvatarFallback: (discriminator?: string) =>
    `https://cdn.discordapp.com/embed/avatars/${
      discriminator ? Number(discriminator) % 5 : 0
    }.png`,
  discordRoleIcon: (id: string, icon: string, size = 20, animate = true) =>
    `https://cdn.discordapp.com/role-icons/${id}/${icon}${
      animate ? "" : ".png"
    }?size=${size}&quality=lossless`,
};
