import { memo } from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  type EdgeProps,
  getSmoothStepPath
} from '@xyflow/react'

type CustomEdgeData = {
  label?: string
  color?: string
}

const CustomEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  const customData = data as CustomEdgeData | undefined
  const edgeLabel = customData?.label
  const edgeColor = customData?.color || '#6366f1'

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: edgeColor
        }}
      />
      {edgeLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 11,
              fontWeight: 600,
              background: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              border: `1px solid ${edgeColor}`,
              color: edgeColor,
              pointerEvents: 'all',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            className='nodrag nopan'
          >
            {edgeLabel}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

export default memo(CustomEdge)
