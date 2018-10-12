import React from 'react';
import {Well} from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const ResultsPlot = ({previousResults, latestResult}) => {
    let manipulatedResults = [...previousResults];
    if(latestResult) {
        manipulatedResults.push(latestResult);
    }
    return (
        <div id="plotParent" className="quizBody">
        <div id="plot">
        {manipulatedResults.length > 0 && 
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={manipulatedResults}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="correctAnswers">
                {manipulatedResults.map((entry, index) => (
                    <Cell key={index} fill={entry.attempt === "Latest" ? '#DAA520' : '#20B2AA' }/>
                ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
        }
        {manipulatedResults.length === 0 &&
            <Well>
                <p>No results</p>
            </Well>
        }
        </div>
        </div>
    );
}

export default ResultsPlot;
