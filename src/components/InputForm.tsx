import { useState } from 'react'
import { CircleData } from '../types'
import { validateAngle } from '../utils/validation'

interface InputFormProps {
  onGenerate: (data: CircleData) => void
  initialData?: CircleData
}

const validDivisions = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45]

const InputForm: React.FC<InputFormProps> = ({ onGenerate, initialData }) => {
  const [diameter, setDiameter] = useState<string>(initialData?.diameter?.toString() || '50')
  const [angleInputMode, setAngleInputMode] = useState<'manual' | 'division'>(initialData?.angleInputMode || 'manual')
  const [angle, setAngle] = useState<string>(initialData?.angle?.toString() || '30')
  const [division, setDivision] = useState<string>(() => {
    if (initialData?.angle) {
      const divisionValue = 360 / initialData.angle
      return validDivisions.includes(divisionValue) ? divisionValue.toString() : '12'
    }
    return '12'
  })
  const [extensionLength, setExtensionLength] = useState<string>(initialData?.extensionLength?.toString() || '10')
  const [errors, setErrors] = useState<{diameter?: string, angle?: string, extensionLength?: string}>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: {diameter?: string, angle?: string, extensionLength?: string} = {}
    
    const diameterNum = parseFloat(diameter)
    const extensionLengthNum = parseInt(extensionLength)
    
    let angleNum: number
    if (angleInputMode === 'manual') {
      angleNum = parseFloat(angle)
      if (!angle || angleNum <= 0) {
        newErrors.angle = '角度は正の数値を入力してください'
      } else if (!validateAngle(angleNum)) {
        newErrors.angle = '角度は360度の約数である必要があります（例：30, 45, 60, 90度など）'
      }
    } else {
      const divisionNum = parseInt(division)
      angleNum = 360 / divisionNum
      console.log('Division mode:', divisionNum, 'Angle:', angleNum)
    }
    
    if (!diameter || diameterNum <= 0) {
      newErrors.diameter = '直径は正の数値を入力してください'
    }
    
    if (!extensionLength || isNaN(extensionLengthNum) || extensionLengthNum < 0 || extensionLengthNum > 20) {
      newErrors.extensionLength = '延長ライン長さは0〜20の整数を入力してください'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      onGenerate({ 
        diameter: diameterNum, 
        angle: angleNum, 
        extensionLength: extensionLengthNum,
        angleInputMode 
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="diameter">円の直径 (mm)</label>
        <input
          className="form-input"
          type="number"
          id="diameter"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          placeholder="例: 50"
          step="0.1"
        />
        {errors.diameter && <div className="error">{errors.diameter}</div>}
      </div>
      
      <div className="form-group">
        <label className="form-label">角度入力方式</label>
        <div className="radio-group">
          <label className={`radio-option ${angleInputMode === 'manual' ? 'active' : ''}`}>
            <input
              className="radio-input"
              type="radio"
              value="manual"
              checked={angleInputMode === 'manual'}
              onChange={(e) => setAngleInputMode(e.target.value as 'manual' | 'division')}
            />
            <span className="radio-label">手動入力（角度指定）</span>
          </label>
          <label className={`radio-option ${angleInputMode === 'division' ? 'active' : ''}`}>
            <input
              className="radio-input"
              type="radio"
              value="division"
              checked={angleInputMode === 'division'}
              onChange={(e) => setAngleInputMode(e.target.value as 'manual' | 'division')}
            />
            <span className="radio-label">等分指定（n等分）</span>
          </label>
        </div>
        
        {angleInputMode === 'manual' ? (
          <div className="input-section manual">
            <label className="section-label manual" htmlFor="angle">角度を直接入力 (度)</label>
            <input
              className="form-input"
              type="number"
              id="angle"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              placeholder="例: 30"
              step="1"
            />
            {errors.angle && <div className="error">{errors.angle}</div>}
            <div className="section-note">
              ※ 360の約数のみ有効（例：30, 45, 60, 90度など）
            </div>
          </div>
        ) : (
          <div className="input-section division">
            <label className="section-label division" htmlFor="division">360度を何等分するか選択</label>
            <select
              className="form-select"
              id="division"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            >
              {validDivisions.map(n => (
                <option key={n} value={n.toString()}>
                  {n}等分 ({(360/n).toFixed(n === 8 || n === 45 ? 1 : 0)}度)
                </option>
              ))}
            </select>
            <div className="section-note">
              ※ 精度の高い角度が自動計算されます
            </div>
          </div>
        )}
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="extensionLength">延長ライン長さ (mm)</label>
        <input
          className="form-input"
          type="number"
          id="extensionLength"
          value={extensionLength}
          onChange={(e) => setExtensionLength(e.target.value)}
          placeholder="例: 10"
          min="0"
          max="20"
          step="1"
        />
        {errors.extensionLength && <div className="error">{errors.extensionLength}</div>}
      </div>
      
      <div className="button-group">
        <button className="primary-button" type="submit">生成</button>
      </div>
    </form>
  )
}

export default InputForm