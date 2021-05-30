import React, { Component } from 'react';
import Axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rows: [], rows2: []
        }
    }

    searchbyparkingname = (keyword) => {
        var dataArray = []
        var url = "http://localhost:3001/searchbyparkingname"
        // console.log(keyword)
        Axios.put(url, {
            keyword: keyword
        }).then(result => {
            result.data.forEach(item => {
                dataArray.push(item)
            })
            this.setState({ rows: dataArray })
        })
    }

    searchbyeventname = (keyword) => {
        var dataArray = []
        var url = "http://localhost:3001/searchbyeventname"
        Axios.put(url, {
            keyword: keyword
        }).then(result => {
            result.data.forEach(item => {
                dataArray.push(item)
            })
            this.setState({ rows2: dataArray })
        })
    }
    render() {
        return (
            <div>
                <input style={{ display: 'block', width: '100%', paddingLeft: 8 }}
                    type="text"
                    className="form-control"
                    placeholder="ค้นหาที่จอดรถ จากชื่อที่จอดรถ หรือชื่องานกิจกรรม"
                    onChange={event => { this.searchbyparkingname(event.target.value); this.searchbyeventname(event.target.value) }}
                />

                <div className="list-group" style={{ display: 'block', width: '100%' }} >
                    <li className="list-group-item list-group-item-primary" >ที่จอดรถ</li>
                    {this.state.rows.map(item => (
                        <a href="#" className="list-group-item list-group-item-action">{item.parkingName}</a>
                    ))}
                </div>

                <div className="list-group" style={{ display: 'block', width: '100%' }} >
                    <li className="list-group-item list-group-item-primary" >งานกิจกรรม</li>
                    {this.state.rows2.map(item => (
                        <a href="#" className="list-group-item list-group-item-action">{item.eventName}</a>
                    ))}
                </div>
            </div>
        );
    }
}

export default Search