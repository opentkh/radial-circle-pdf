import { PDFDocument, rgb } from 'pdf-lib'
import { CircleData } from '../types'
import { MM_TO_PT } from './dimensions'

export const generatePDF = async (circleData: CircleData): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842]) // A4 size
  
  const { width, height } = page.getSize()
  const centerX = width / 2
  const centerY = height / 2
  
  const radius = (circleData.diameter * MM_TO_PT) / 2
  const extensionLength = circleData.extensionLength * MM_TO_PT
  
  const angleRad = (circleData.angle * Math.PI) / 180
  const numLines = 360 / circleData.angle
  
  page.drawCircle({
    x: centerX,
    y: centerY,
    size: radius,
    borderColor: rgb(0, 0, 0),
    borderWidth: 2,
  })
  
  for (let i = 0; i < numLines; i++) {
    const currentAngle = i * angleRad
    const extendedEndX = centerX + (radius + extensionLength) * Math.cos(currentAngle)
    const extendedEndY = centerY + (radius + extensionLength) * Math.sin(currentAngle)
    
    page.drawLine({
      start: { x: centerX, y: centerY },
      end: { x: extendedEndX, y: extendedEndY },
      thickness: 1,
      color: rgb(0, 0, 0),
    })
  }
  
  return await pdfDoc.save()
}