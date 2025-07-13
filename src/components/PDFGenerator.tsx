import { CircleData } from '../types'
import { generatePDF } from '../utils/pdfGeneration'

interface PDFGeneratorProps {
  circleData: CircleData
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ circleData }) => {
  const handleSavePDF = async () => {
    try {
      const pdfBytes = await generatePDF(circleData)
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = `radial-circle-${circleData.diameter}cm-${circleData.angle}deg.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF生成エラー:', error)
      alert('PDF生成に失敗しました')
    }
  }

  return (
    <button onClick={handleSavePDF}>
      保存
    </button>
  )
}

export default PDFGenerator