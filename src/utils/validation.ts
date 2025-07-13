export const validateAngle = (angle: number): boolean => {
  return 360 % angle === 0
}