import React, { Component, CSSProperties } from 'react'

export default class Chart extends Component {
    render() {
        return (
            <div style={container}>
                <div style={chart}>
                    <p>When I grow up, I wanna be a chart!</p>

                </div>
            </div>
        )
    }
}

const chart: CSSProperties = {
    width: '10000px',
    height: '600px'
}

const container: CSSProperties = {
    backgroundColor: 'gray',
    overflowX: 'scroll'
}
