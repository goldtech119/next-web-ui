export const abbreviateNumber = (input: number | `${number}`) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(input));
};
