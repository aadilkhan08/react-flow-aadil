import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'

export type CustomNodeData = {
  label: string
  description?: string
  icon?: string
  color?: string
}

const CustomNode = ({ data, selected }: NodeProps) => {
  const { label, description, icon, color = '#6366f1' } = data as CustomNodeData

  return (
    <div
      className={`custom-node ${selected ? 'selected' : ''}`}
      style={{
        background: 'white',
        border: `2px solid ${selected ? color : '#e2e8f0'}`,
        borderRadius: '12px',
        padding: '16px',
        minWidth: '200px',
        boxShadow: selected
          ? `0 8px 24px rgba(99, 102, 241, 0.25), 0 0 0 3px ${color}20`
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.2s ease'
      }}
    >
      <Handle
        type='target'
        position={Position.Top}
        style={{
          background: color,
          width: '12px',
          height: '12px',
          border: '2px solid white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {icon && (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}
          >
            {icon}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: '#1e293b',
              marginBottom: description ? '4px' : '0'
            }}
          >
            {label}
          </div>
          {description && (
            <div
              style={{
                fontSize: '12px',
                color: '#64748b',
                lineHeight: '1.4'
              }}
            >
              {description}
            </div>
          )}
        </div>
      </div>

      <Handle
        type='source'
        position={Position.Bottom}
        style={{
          background: color,
          width: '12px',
          height: '12px',
          border: '2px solid white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      />
    </div>
  )
}

export default memo(CustomNode)
