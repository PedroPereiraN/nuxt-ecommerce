export const numberMask = (
  value: string | number | undefined,
  decimals: number,
) => {
  if (value) {
    let num = "";

    if (typeof value === "number") {
      num = value.toFixed(decimals);
    }

    if (typeof value === "string") {
      num = value;
    }

    const removeMask = num.toString().replace(/\./g, "").replace(/,/g, "");
    const rz = new RegExp(String.raw`^(0+)([0-9]{${decimals + 1}})`);
    const removeZeros = removeMask.replace(rz, "$2");
    const re = new RegExp(String.raw`(\d{${decimals}})$`, "gim");
    const comma = removeZeros.replace(re, ",$1");
    const v = comma.replace(/\B(?=(\d{3})+(?!\d)(?=,))/g, ".");

    return v;
  }

  return "0,00";
};
