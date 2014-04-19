React=require('react')
Test = React.createClass
    render: ->
        `<h1>Hi there 0x4139</h1>`

React.renderComponent `<Test/>`, document.getElementById('container')
