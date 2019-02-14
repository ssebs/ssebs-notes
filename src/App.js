import React, { Component } from "react";
import { markdown } from "markdown";
import "./App.scss";
// import CodeMirror from "@uiw/react-codemirror";
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/keymap/sublime";
import "codemirror/theme/darcula.css";
import "codemirror/mode/markdown/markdown";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "# test\n",
            rendered: "",
            options: {
                theme: "darcula",
                mode: "markdown",
                lineNumbers: true
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.refs.editor.getCodeMirror().focus();
        this.refs.editor
            .getCodeMirror()
            .setCursor(this.refs.editor.getCodeMirror().lineCount(), 0);
        this.refs.editor.getCodeMirror().setSize("100%", "100%");
        this.refs.editor.getCodeMirror().refresh();
        this.handleChange(this.state.code);
    }

    handleChange(newCode) {
        this.setState({
            rendered: markdown.toHTML(newCode)
        });
    }

    render() {
        return (
            <div>
                <div className='top'>
                    <h1>Markdown Editor</h1>
                    <hr />
                </div>
                <div
                    style={{
                        width: "50%",
                        float: "left"
                    }}
                >
                    <div className='middle'>
                        <CodeMirror
                            ref='editor'
                            value={this.state.code}
                            options={this.state.options}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div
                    style={{
                        width: "50%",
                        float: "left"
                    }}
                >
                    <div
                        className='middle'
                        dangerouslySetInnerHTML={{
                            __html: this.state.rendered
                        }}
                    />
                </div>
                <div className='bottom'>Footer</div>
            </div>
        );
    }
}

export default App;
