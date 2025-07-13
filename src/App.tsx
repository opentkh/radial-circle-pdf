import { useState } from 'react'
import InputForm from './components/InputForm'
import CanvasPreview from './components/CanvasPreview'
import PDFGenerator from './components/PDFGenerator'
import { CircleData } from './types'

function App() {
  const [circleData, setCircleData] = useState<CircleData | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const handleGenerate = (data: CircleData) => {
    setCircleData(data)
    setShowPreview(true)
  }

  const handleReset = () => {
    setCircleData(null)
    setShowPreview(false)
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Radial Circle PDF Generator</h1>
      </div>
      
      {!showPreview ? (
        <InputForm onGenerate={handleGenerate} />
      ) : (
        <div>
          <CanvasPreview circleData={circleData!} />
          <div>
            <PDFGenerator circleData={circleData!} />
            <button onClick={handleReset}>再作成</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App