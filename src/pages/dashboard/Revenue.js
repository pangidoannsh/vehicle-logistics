import React, { Component } from 'react'

export default class Revenue extends Component {

    constructor() {
        super()
        this.state = {
            datas: null
        }

    }
    componentDidMount() {
        // console.log("test");
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => this.setState({
                datas: json
            }))
    }
    componentDidUpdate() {
        console.log(this.state);
    }
    render() {
        const { datas } = this.state
        if (datas) {
            return (
                <>
                    {datas.map((data, index) => (
                        <div key={index}>{data.title}</div>
                    ))}
                </>
            )
        }
        else {
            <div>Revenue</div>
        }
    }
}
