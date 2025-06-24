export function priceConverter(price: number, forSale: boolean): string {
  let formatted = '';
  
  if (price >= 1_000_000_000) {
    formatted = `${(price / 1_000_000_000).toFixed(1)} B`;
  } else if (price >= 1_000_000) {
    formatted = `${(price / 1_000_000).toFixed(1)} M`;
  } else if (price >= 1_000) {
    formatted = `${(price / 1_000).toFixed(0)} k`;
  } else {
    formatted = `${price}`;
  }

  const suffix = forSale ? 'Ft' : 'Ft / month';
  return `${formatted} ${suffix}`;
}
