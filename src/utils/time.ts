export const getTime = (time: string): string => {
  // TODO: сделать нормальное сравунение с текущей датой
  const date = new Date(time);

  return `${date.getHours()}:${date.getMinutes()}`;
}
