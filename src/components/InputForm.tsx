import { useState } from 'react'
import { CircleData } from '../types'
import { validateAngle } from '../utils/validation'

interface InputFormProps {
  onGenerate: (data: CircleData) => void
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate }) => {
  const [diameter, setDiameter] = useState<string>('')
  const [angle, setAngle] = useState<string>('')
  const [errors, setErrors] = useState<{diameter?: string, angle?: string}>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: {diameter?: string, angle?: string} = {}
    
    const diameterNum = parseFloat(diameter)
    const angleNum = parseFloat(angle)
    
    if (!diameter || diameterNum <= 0) {
      newErrors.diameter = '直径は正の数値を入力してください'
    }
    
    if (!angle || angleNum <= 0) {
      newErrors.angle = '角度は正の数値を入力してください'
    } else if (!validateAngle(angleNum)) {
      newErrors.angle = '角度は360度の約数である必要があります（例：30, 45, 60, 90度など）'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      onGenerate({ diameter: diameterNum, angle: angleNum })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="diameter">円の直径 (cm)</label>
        <input
          type="number"
          id="diameter"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          placeholder="例: 10"
          step="0.1"
        />
        {errors.diameter && <div className="error">{errors.diameter}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="angle">角度 (度)</label>
        <input
          type="number"
          id="angle"
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
          placeholder="例: 30"
          step="1"
        />
        {errors.angle && <div className="error">{errors.angle}</div>}
      </div>
      
      <button type="submit">生成</button>
    </form>
  )
}

export default InputForm