export const calculateMath = (data, startIndex, isMobileView) => {
  const slicedData = data
    .slice(startIndex, isMobileView ? startIndex + 3 : startIndex + 5)
    .map((row) => row[3]);

  const min = Math.min(...slicedData);
  const max = Math.max(...slicedData);
  const average =
    slicedData.reduce((acc, val) => acc + val, 0) / slicedData.length;

  const format = (data) => {
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return { min, max, average, format };
};
