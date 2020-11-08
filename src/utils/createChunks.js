export default (arr, chunkSize) => {
  const result = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const currentChunk = arr.slice(i, i + chunkSize);

    result.push(currentChunk);
  }

  return result;
};
