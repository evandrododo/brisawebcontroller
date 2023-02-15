import './Node.css'
import React, { useState } from "react"

type Props = {
  title: string;
  children?: React.ReactNode;
}


const Node: React.FC<Props> = ({ title, children }) => {

  const [xAtual, setXAtual] = useState(0)
  const [yAtual, setYAtual] = useState(0)
  const [dragging, setDragging] = useState(false)

  const mouseDownElement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e = e || window.event;
    e.preventDefault();

    setXAtual(e.clientX)
    setYAtual(e.clientY)
    
    setDragging(true)
  }

  const mouseUpElement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setDragging(false);
  }

  const dragElement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.currentTarget;
    e = e || window.event;
    e.preventDefault();
    
    const xNovo = xAtual - e.clientX;
    const yNovo = yAtual - e.clientY;
    
    setXAtual(e.clientX);
    setYAtual(e.clientY);

    element.style.top = (element.offsetTop - yNovo) + "px";
    element.style.left = (element.offsetLeft - xNovo) + "px";
  }

  return (
    <div 
      className="draggable-node" 
      onMouseDown={mouseDownElement}
      onMouseUp={dragging ? mouseUpElement : () => {}}
      onMouseMove={dragging ? dragElement : () => {}}
    >
      <h3>{title}</h3>
      <div className="node-content">
        {children}
      </div>
    </div>
  )
}

export default Node