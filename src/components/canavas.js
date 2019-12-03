import React, { useState, useEffect, useRef } from 'react'
import useWindowSize from './windowsSize'

export default function Canvas(props) {
  const [drawing, setDrawing] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  
  const canvasRef = useRef()
  const ctx = useRef()
  
  useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d')
  }, [])
  
  const [windowWidth, windowHeight] = useWindowSize(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })
  
  function handleMouseMove(e) {
    
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    ]
    if (drawing) { 
      ctx.current.lineTo(...coords)
      ctx.current.stroke()
    }
    if (props.handleMouseMove) {
        props.handleMouseMove(...coords)
    }
  }
  function startDrawing(e) {
    ctx.current.lineJoin = 'round'
    ctx.current.lineCap = 'round'
    ctx.current.lineWidth = 10
    ctx.current.strokeStyle = props.color
    ctx.current.beginPath();
    
    ctx.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    )
    setDrawing(true)
  }
  function stopDrawing() {
    ctx.current.closePath()
    setDrawing(false)
  }
  
  return <canvas
    ref={canvasRef}
    width={props.width || width}
    height={props.height || height}
    onMouseDown={startDrawing}
    onMouseUp={stopDrawing}
    onMouseOut={stopDrawing}
    onMouseMove={handleMouseMove}
  />
}