import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

class Statistics extends Component {
    render() {
        const sampleData = [{name:'1', value:8},{name: '2', value : 5},{name:'3', value:2},{name: '4', value : 10}]
        return (
            <div>
                <h1>Apprentice Level</h1>
                <BarChart width={730} height={250} data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="name" fill="#8884d8" />
                </BarChart>
            </div>
        );
    }
}

export default Statistics;
