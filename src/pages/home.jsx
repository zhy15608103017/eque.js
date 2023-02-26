import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
const boxdiv = styled.div`
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
const div = styled.div`
  width: 296px;
  height: 410px;
`
export default function home() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <boxdiv
        style={{
          width: '80vw',
          height: ' 80vh',
          display: 'flex',
          justifyContent: 'space-between',
        
        }}
      >
        <div onclick={() => {}}>
          <a href="#/index" target="_blank">
            {' '}
            <img
              style={{
                width: '228px',
                height: '350px'
              }}
              src="./files/金山御製梁皇寶懺.jpg"
            />
          </a>
          <p>佛教十三经</p>
        </div>
        <div>
          <a href="#/index" target="_blank">
            <img
              style={{
                width: '228px',
                height: '350px'
              }}
              src="./files/金山御製梁皇寶懺.jpg"
            />
          </a>
          <p>佛教十三经</p>
        </div>
        <div>
          <a href="#/index" target="_blank">
            <img
              style={{
                width: '228px',
                height: '350px'
              }}
              src="./files/金山御製梁皇寶懺.jpg"
            />
          </a>
          <p>佛教十三经</p>
        </div>
        <div>
          <a href="#/index" target="_blank">
            <img
              style={{
                width: '228px',
                height: '350px'
              }}
              src="./files/金山御製梁皇寶懺.jpg"
            />
          </a>
          <p>佛教十三经</p>
        </div>
  
      </boxdiv>
    </div>
  )
}
