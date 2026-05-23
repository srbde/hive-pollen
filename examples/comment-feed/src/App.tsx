import { useState, useEffect } from 'react'
import { Client, BlockchainMode } from '@srbde/pollen'
import './App.css'

// Initial nodes
const NODES = [
  'https://api.hive.blog',
  'https://api.openhive.network',
  'https://anyx.io'
]

interface HiveComment {
  id: string
  author: string
  permlink: string
  body: string
  timestamp: string
}

function App() {
  const [comments, setComments] = useState<HiveComment[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const client = new Client(NODES)
    let isMounted = true

    const stream = client.blockchain.getOperationsStream({
      mode: BlockchainMode.Latest
    })

    setIsConnected(true)

    stream.on('data', (op: any) => {
      if (!isMounted) return

      if (op.op[0] === 'comment') {
        const commentData = op.op[1]
        
        // Filter out edits (they start with @@)
        if (commentData.body.startsWith('@@')) return

        const newComment: HiveComment = {
          id: `${op.trx_id}-${op.block_num}`,
          author: commentData.author,
          permlink: commentData.permlink,
          body: commentData.body.length > 280 
            ? commentData.body.substring(0, 280) + '...' 
            : commentData.body,
          timestamp: new Date().toLocaleTimeString()
        }

        setComments(prev => [newComment, ...prev].slice(0, 50))
      }
    })

    stream.on('error', (err: any) => {
      console.error('Stream error:', err)
      if (isMounted) setIsConnected(false)
    })

    return () => {
      isMounted = false
      // In a real app we would close the stream, but dhive handles it on destroy
    }
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1>🌸 Pollen Feed</h1>
        <div className="status">
          <div className={`indicator ${isConnected ? '' : 'disconnected'}`} />
          {isConnected ? 'Live' : 'Connecting...'}
        </div>
      </header>

      <main className="feed">
        {comments.length === 0 ? (
          <div className="empty">Waiting for block production...</div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-card">
              <div className="meta">
                <span className="author">@{comment.author}</span>
                <span className="time">{comment.timestamp}</span>
              </div>
              <div className="body">
                {comment.body}
              </div>
            </div>
          ))
        )}
      </main>

      <footer className="footer">
        Powered by Pollen 🌸 | Copyright 2026 Sustainable Resource and Business Development Enterprise
      </footer>
    </div>
  )
}

export default App
