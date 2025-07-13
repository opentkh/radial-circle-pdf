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
    setShowPreview(false)
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">Radial Circle PDF Generator</h1>
        <p className="app-subtitle">指定した直径の円と角度毎の放射線を描画し、PDF出力するWebアプリケーション</p>
      </header>
      
      <div className="main-card">
        {!showPreview ? (
          <InputForm onGenerate={handleGenerate} initialData={circleData || undefined} />
        ) : (
          <div>
            <div className="canvas-container">
              <CanvasPreview circleData={circleData!} />
            </div>
            <div className="button-group">
              <PDFGenerator circleData={circleData!} />
              <button className="secondary-button" onClick={handleReset}>再作成</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App