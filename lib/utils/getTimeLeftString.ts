const getTimeLeftString = (value: number): string => {
  const hours = String(Math.floor(value / 3600));
  const minutes = String(Math.floor((value % 3600) / 60));
  const seconds = String(Math.floor(value % 60));

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};

export default getTimeLeftString;
