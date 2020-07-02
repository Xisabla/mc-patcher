const React = require('react')
const { render } = require('react-dom')

require('./App.scss')

class App extends React.Component {
    render() {
        return <h1>Hello World</h1>
    }
}

render(<App />, document.getElementById('root'))
