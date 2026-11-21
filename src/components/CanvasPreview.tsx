import { useRef, useEffect } from 'react'
import { CircleData } from '../types'
import { exceedsPrintArea, getTotalSizeMm, printAreaWarning } from '../utils/dimensions'

interface CanvasPreviewProps {
  circleData: CircleData
}

const CANVAS_SIZE = 400
const CANVAS_PADDING = 20

const CanvasPreview: React.FC<CanvasPreviewProps> = ({ circleData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const totalSize = getTotalSizeMm(circleData.diameter, circleData.extensionLength)
  const showWarning = exceedsPrintArea(circleData.diameter, circleData.extensionLength)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 図全体（直径＋延長×2）がキャンバスに収まるよう縮尺を決める
    const scale = (CANVAS_SIZE - CANVAS_PADDING * 2) / totalSize

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = (circleData.diameter / 2) * scale
    const extensionLength = circleData.extensionLength * scale

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
  }, [circleData, totalSize])

  return (
    <div>
      <h3>プレビュー</h3>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{ display: 'block', margin: '20px auto' }}
      />
      <p className="preview-note">
        全体サイズ {totalSize}mm（画面に合わせて縮小・拡大して表示しています。PDFは実寸です）
      </p>
      {showWarning && (
        <div className="warning">
          {printAreaWarning(circleData.diameter, circleData.extensionLength)}
        </div>
      )}
    </div>
  )
}

export default CanvasPreview
