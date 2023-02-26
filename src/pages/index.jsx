import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'
import { ReactReader } from './../modules'
import defaultStyles from './../modules/ReactReader/style.js'
import { Col, InputNumber, Row, Slider } from 'antd'
import {
  Container,
  ReaderContainer,
  Bar,
  LogoWrapper,
  Logo,
  GenericButton,
  CloseIcon,
  FontSizeButton,
  ButtonWrapper,
  fonsizeBtn
} from './../Components'

const storage = global.localStorage || null
const DEMO_URL =
  'https://osssit.jus-link.com/view/1.epub?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jusda%2F20230222%2F%2Fs3%2Faws4_request&X-Amz-Date=20230222T135856Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=201c80e26e95bcc9724d9cc680cae594e493a51728dd60d2c1d769c3459e9cc7'
const DEMO_NAME = ''

const GlobalStyle = createGlobalStyle`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-weight: 300;
    line-height: 1.4;
    word-break: break-word;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-size: 1.8rem;
    background: #fff;
    position: absolute;
    height: 100%;
    width: 100%;
    color: #fff;
  }
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullscreen: true,
      location:
        storage && storage.getItem('epub-location')
          ? storage.getItem('epub-location')
          : 2,
      localFile: null,
      localName: null,
      largeText: false,
      fontSize: 14,
      inputValue: 0,
      locations: ''
    }
    this.rendition = null
    this.themeList = [
      {
        name: 'default',
        style: {
          body: { color: '#ccc', background: '#6d6d6f' }
        }
      },
      {
        name: 'eye',
        style: {
          body: { color: '#000', background: '#ceeaba' }
        }
      },
      {
        name: 'night',
        style: {
          body: { color: '#fff', background: '#000' }
        }
      },
      {
        name: 'gold',
        style: {
          body: { color: '#000', background: 'rgb(241,236,226)' }
        }
      }
    ]
  }

  toggleFullscreen = () => {
    this.setState(
      {
        fullscreen: !this.state.fullscreen
      },
      () => {
        setTimeout(() => {
          this.rendition.resize()
        }, 500)
      }
    )
  }
  setTheme = name => {
    let item = this.themeList.filter(i => {
      return i.name === name
    })[0]

    this.rendition.themes.register(item.name, item.style)
    this.rendition.themes.select(item.name)
  }
  onLocationChanged = location => {
    const arr = this.locations._locations.filter(i => {
      return i.replaceAll(',', '').indexOf(location) !== -1
    })
    const index = this.locations._locations.indexOf(arr[0])
    console.log(index, location, this.locations._locations)
    if (index !== -1) {
      const num = index / this.locations._locations.length
      console.log(num)
      // this.setState({
      //     inputValue：
      // }
      //     )
    }
    console.log(location, 'location')

    this.setState(
      {
        location
      },
      () => {
        storage && storage.setItem('epub-location', location)
      }
    )
  }
  setlocations = location => {
    this.locations = location
  }
  onToggleFontSize = () => {
    // const nextState = !this.state.largeText
    if (this.state.fontSize < 12) {
      return
    }
    this.setState(
      {
        fontSize: this.state.fontSize - 2
      },
      () => {
        this.rendition.themes.fontSize(this.state.fontSize + 'px')
      }
    )
  }
  onaddToggleFontSize = () => {
    if (this.state.fontSize > 32) {
      return
    }
    // const nextState = !this.state.largeText
    this.setState(
      {
        fontSize: this.state.fontSize + 2
      },
      () => {
        this.rendition.themes.fontSize(this.state.fontSize + 'px')
      }
    )
  }
  onChange = newValue => {
    // console.log(this.rendition.locations.cfiFromPercentage(newValue / 100))
    const location = this.locations.cfiFromPercentage(newValue / 100)
    this.rendition.display(location)
    this.setState({
      inputValue: newValue
    })
  }
  menuJup = newValue => {
    console.log(newValue)
  }
  getRendition = rendition => {
    // Set inital font-size, and add a pointer to rendition for later updates
    const { largeText } = this.state
    this.rendition = rendition
    rendition.themes.fontSize(largeText ? '140%' : '100%')
  }
  render() {
    const { fullscreen, location, localFile, localName, fontSize, inputValue } =
      this.state
    const barRander = () => {
      return (
        <Bar>
          <div>字体大小</div>
          <div
            style={defaultStyles.fonsizeBtn}
            onClick={this.onaddToggleFontSize}
          >
            +
          </div>
          <div>{fontSize}</div>
          <div style={defaultStyles.fonsizeBtn} onClick={this.onToggleFontSize}>
            -
          </div>
          <div
            style={{
              marginLeft: '20px'
            }}
          >
            {' '}
            <span> 主题</span>
            {this.themeList.map((item, i) => {
              return (
                <span
                  onClick={() => {
                    this.setTheme(item.name)
                  }}
                  key={i}
                  style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    marginLeft: '10px',
                    display: 'inline-block',

                    backgroundColor: item.style?.body?.background
                  }}
                ></span>
              )
            })}
          </div>
          <div
            style={{
              marginLeft: '20px'
            }}
          >
            <Row>
              <Col span={12}>
                <Slider
                  min={1}
                  max={100}
                  onChange={this.onChange}
                  value={typeof inputValue === 'number' ? inputValue : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={20}
                  style={{ margin: '0 16px' }}
                  value={inputValue}
                  onChange={this.onChange}
                />
              </Col>
            </Row>
          </div>
        </Bar>
      )
    }
    return (
      <Container>
        <GlobalStyle />

        <ReaderContainer fullscreen={fullscreen}>
          <ReactReader
            url={localFile || DEMO_URL}
            title={localName || DEMO_NAME}
            location={location}
            locationChanged={this.onLocationChanged}
            getRendition={this.getRendition}
            themeList={this.themeList}
            setlocations={this.setlocations}
            menuJup={this.menuJup()}
            barRander={barRander}
          />
          // // // // // //{' '}
        </ReaderContainer>
      </Container>
    )
  }
}

export default App
