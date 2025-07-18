import { useRef, useEffect } from 'react'
import { CircleData } from '../types'

interface CanvasPreviewProps {
  circleData: CircleData
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({ circleData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = circleData.diameter / 2 // mm to pixels (1px = 1mm)
    const extensionLength = circleData.extensionLength // mm

    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    const angleRad = (circleData.angle * Math.PI) / 180
    const numLines = 360 / circleData.angle

    for (let i = 0; i < numLines; i++) {
      const currentAngle = i * angleRad
      const extendedEndX = centerX + (radius + extensionLength) * Math.cos(currentAngle)
      const extendedEndY = centerY + (radius + extensionLength) * Math.sin(currentAngle)

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(extendedEndX, extendedEndY)
      ctx.stroke()
    }
  }, [circleData])

  return (
    <div>
      <h3>プレビュー</h3>
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={400}
        style={{ display: 'block', margin: '20px auto' }}
      />
    </div>
  )
}

export default CanvasPreview