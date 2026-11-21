// 1インチ = 25.4mm = 72pt
export const MM_TO_PT = 72 / 25.4

// A4幅(210mm)から左右5mmずつの余白を引いた、印刷で欠けにくい最大サイズ
export const MAX_PRINT_SIZE_MM = 200

// 図全体の外形サイズ（直径 + 両側の延長ライン）
export const getTotalSizeMm = (diameter: number, extensionLength: number): number =>
  diameter + extensionLength * 2

export const exceedsPrintArea = (diameter: number, extensionLength: number): boolean =>
  getTotalSizeMm(diameter, extensionLength) > MAX_PRINT_SIZE_MM

export const printAreaWarning = (diameter: number, extensionLength: number): string =>
  `図全体のサイズ（直径＋延長×2）が${getTotalSizeMm(diameter, extensionLength)}mmで、` +
  `推奨上限の${MAX_PRINT_SIZE_MM}mmを超えています。PDFの用紙からはみ出したり、印刷時に端が欠けたりする可能性があります。`
