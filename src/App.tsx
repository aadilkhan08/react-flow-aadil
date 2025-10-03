import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
  MarkerType
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import './App.css'

import CustomNode from './nodes/CustomNode'
import CustomEdge from './edges/CustomEdge'

const nodeTypes = {
  custom: CustomNode
}

const edgeTypes = {
  custom: CustomEdge
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 50 },
    data: {
      label: 'Pathshala Hub',
      description: 'Sign up & create account',
      icon: '👤',
      color: '#8b5cf6'
    }
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: {
      label: 'Email Verification',
      description: 'Confirm email address',
      icon: '✉️',
      color: '#3b82f6'
    }
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 400, y: 200 },
    data: {
      label: 'Profile Setup',
      description: 'Complete user profile',
      icon: '⚙️',
      color: '#06b6d4'
    }
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 250, y: 350 },
    data: {
      label: 'Dashboard Access',
      description: 'View analytics & data',
      icon: '📊',
      color: '#10b981'
    }
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 100, y: 500 },
    data: {
      label: 'Payment Setup',
      description: 'Add payment method',
      icon: '💳',
      color: '#f59e0b'
    }
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 400, y: 500 },
    data: {
      label: 'Subscription',
      description: 'Choose plan & subscribe',
      icon: '⭐',
      color: '#ec4899'
    }
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 250, y: 650 },
    data: {
      label: 'Full Access',
      description: 'All features unlocked',
      icon: '🚀',
      color: '#6366f1'
    }
  }
]

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#3b82f6'
    },
    data: { label: 'Send email', color: '#3b82f6' }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#06b6d4'
    },
    data: { label: 'Continue', color: '#06b6d4' }
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#10b981'
    },
    data: { label: 'Verified', color: '#10b981' }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#10b981'
    },
    data: { label: 'Complete', color: '#10b981' }
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#f59e0b'
    },
    data: { label: 'Add payment', color: '#f59e0b' }
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#ec4899'
    },
    data: { label: 'Choose plan', color: '#ec4899' }
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#6366f1'
    },
    data: { label: 'Activate', color: '#6366f1' }
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#6366f1'
    },
    data: { label: 'Subscribe', color: '#6366f1' }
  }
]

export default function App () {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges(eds =>
        addEdge(
          {
            ...params,
            type: 'custom',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed
            }
          },
          eds
        )
      ),
    [setEdges]
  )

  const proOptions = useMemo(() => ({ hideAttribution: true }), [])

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={proOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: 'custom',
          animated: true
        }}
      >
        <Background color='#94a3b8' gap={16} />
        <Controls />
        <MiniMap
          nodeColor={node => {
            const data = node.data as { color?: string }
            return data.color || '#6366f1'
          }}
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  )
}
