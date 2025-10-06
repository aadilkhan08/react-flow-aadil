import { useCallback, useMemo, useState } from 'react'
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
  MarkerType,
  Panel
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

const nodeTemplates = [
  { label: 'Trigger', icon: '▶️', color: '#ff6b6b', category: 'Core' },
  { label: 'HTTP Request', icon: '🌐', color: '#4ecdc4', category: 'Core' },
  { label: 'Webhook', icon: '🔔', color: '#95e1d3', category: 'Core' },
  { label: 'Gmail', icon: '📧', color: '#ea4335', category: 'Communication' },
  { label: 'Slack', icon: '💬', color: '#4a154b', category: 'Communication' },
  {
    label: 'Google Sheets',
    icon: '📊',
    color: '#34a853',
    category: 'Productivity'
  },
  { label: 'OpenAI', icon: '🤖', color: '#10a37f', category: 'AI' },
  { label: 'Database', icon: '🗄️', color: '#5f27cd', category: 'Data' },
  { label: 'Code', icon: '⚡', color: '#feca57', category: 'Core' },
  { label: 'Filter', icon: '🔍', color: '#48dbfb', category: 'Core' },
  { label: 'Schedule', icon: '⏰', color: '#ff9ff3', category: 'Core' },
  { label: 'Transform', icon: '🔄', color: '#54a0ff', category: 'Data' }
]

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 300, y: 100 },
    data: {
      label: 'Trigger',
      description: 'When workflow starts',
      icon: '▶️',
      color: '#ff6b6b'
    }
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 300, y: 250 },
    data: {
      label: 'HTTP Request',
      description: 'Make API call',
      icon: '🌐',
      color: '#4ecdc4'
    }
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 300, y: 400 },
    data: {
      label: 'OpenAI',
      description: 'Process with AI',
      icon: '🤖',
      color: '#10a37f'
    }
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 100, y: 550 },
    data: {
      label: 'Gmail',
      description: 'Send email',
      icon: '�',
      color: '#ea4335'
    }
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 500, y: 550 },
    data: {
      label: 'Slack',
      description: 'Send message',
      icon: '�',
      color: '#4a154b'
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
      color: '#64748b'
    },
    data: { color: '#64748b' }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#64748b'
    },
    data: { color: '#64748b' }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#64748b'
    },
    data: { color: '#64748b' }
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#64748b'
    },
    data: { color: '#64748b' }
  }
]

export default function App () {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges(eds =>
        addEdge(
          {
            ...params,
            type: 'custom',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#64748b'
            }
          },
          eds
        )
      ),
    [setEdges]
  )

  const proOptions = useMemo(() => ({ hideAttribution: true }), [])

  const onDragStart = (
    event: React.DragEvent,
    nodeData: typeof nodeTemplates[0]
  ) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(nodeData)
    )
    event.dataTransfer.effectAllowed = 'move'
  }

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const data = event.dataTransfer.getData('application/reactflow')
      if (!data) return

      const nodeData = JSON.parse(data)
      const position = { x: event.clientX - 100, y: event.clientY - 50 }

      const newNode: Node = {
        id: `${Date.now()}`,
        type: 'custom',
        position,
        data: {
          label: nodeData.label,
          description: 'Configure this node',
          icon: nodeData.icon,
          color: nodeData.color
        }
      }

      setNodes(nds => nds.concat(newNode))
    },
    [setNodes]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const categories = ['All', ...new Set(nodeTemplates.map(n => n.category))]
  const filteredNodes =
    selectedCategory === 'All'
      ? nodeTemplates
      : nodeTemplates.filter(n => n.category === selectedCategory)

  return (
    <div className='n8n-container'>
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className='sidebar-header'>
          <h2>Nodes</h2>
          <button
            className='sidebar-toggle'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        {sidebarOpen && (
          <>
            <div className='category-tabs'>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-tab ${
                    selectedCategory === cat ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className='node-list'>
              {filteredNodes.map((node, idx) => (
                <div
                  key={idx}
                  className='node-item'
                  draggable
                  onDragStart={e => onDragStart(e, node)}
                  style={{ borderLeft: `3px solid ${node.color}` }}
                >
                  <span className='node-icon'>{node.icon}</span>
                  <div className='node-info'>
                    <div className='node-name'>{node.label}</div>
                    <div className='node-category'>{node.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div
        className='canvas-container'
        style={{ marginLeft: sidebarOpen ? '280px' : '50px' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={proOptions}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={2}
          defaultEdgeOptions={{
            type: 'custom',
            animated: true
          }}
        >
          <Background color='#374151' gap={20} size={2} />
          <Controls />
          <MiniMap
            nodeColor={node => {
              const data = node.data as { color?: string }
              return data.color || '#6366f1'
            }}
            nodeStrokeWidth={3}
            zoomable
            pannable
            className='n8n-minimap'
          />
          <Panel position='top-right' className='workflow-controls'>
            <button className='control-btn'>▶ Execute</button>
            <button className='control-btn'>💾 Save</button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}
