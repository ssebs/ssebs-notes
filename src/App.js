import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'
import { markdown } from 'markdown'
import './App.scss'
import '../node_modules/codemirror/lib/codemirror.css'
import '../node_modules/codemirror/theme/darcula.css'
import '../node_modules/codemirror/mode/markdown/markdown'
import '../node_modules/codemirror/addon/display/autorefresh'
import '../node_modules/codemirror/addon/edit/closebrackets'
import '../node_modules/codemirror/addon/edit/continuelist'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      code: '# test\n',
      renderedMD: '',
      options: {
        mode: 'markdown',
        theme: 'darcula',
        autofocus: true,
        lineWrapping: true,
        autoCloseBrackets: true,
        highlightFormatting: true
      }
    }
  }

  updateCode (newCode) {
    this.setState({
      code: newCode,
      renderedMD: markdown.toHTML(newCode)
    })
  }

  componentDidMount () {
    this.updateCode(this.state.code)
  }

  handleSubmit () {
    console.log(this.state.code)
  }

  render () {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div className='halfScreen'>
          <h2>Editor</h2>
          <CodeMirror
            ref='editor'
            value={this.state.code}
            onChange={this.updateCode.bind(this)}
            options={this.state.options} />
        </div>
        <div className='halfScreen'>
          <h2>Output</h2>
          <div dangerouslySetInnerHTML={{ __html: this.state.renderedMD }}>
          </div>
        </div>
        <div style={{clear: 'both'}}></div>
        <div style={{margin: 'auto', marginTop: '20px', textAlign: 'center'}}>
          <button onClick={this.handleSubmit.bind(this)}>
            Save!
          </button>
        </div>
      </div>
    )
  }
}

export default App
