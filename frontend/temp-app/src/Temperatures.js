import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CanvasJSReact from '@canvasjs/react-charts';

function Temperatures() {
    const [temperaturePoints, setTemperaturePoints] = useState([]);
    const [temperatures, setTemperatures] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [closestValue, setClosestValue] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [errMessage, setErrMessage] = useState("No data provided.");
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    // chart display options
    const options = {
        theme: "light2",
        title: {
            text: "Temperature chart"
        },
        dataPointWidth: 25,
        axisX: {
            lineThickness: 0,
            tickLength: 0,
            labelFormatter: function () {
                return "";
            }
        },
        axisY: {
            gridThickness: 1,
            includeZero: true,
            stripLines: [
                {
                    value: 0,
                    showOnTop: true,
                    color: "black",
                    thickness: 2
                }
            ]
        },
        data: [{
            type: "column",
            indexLabel: "{y}",
            dataPoints: temperaturePoints,
        }],
    };

    // update chart data points when new data calculation is received
    useEffect(() => {
        if (isSubmitted) {
            createDataPoints();
        }
    }, [closestValue])

    // makes POST request to the backend program and receives the temperature closest to 0
    const submitTemps = (e) => {
        e.preventDefault();
        if (temperatures.length !== 0) { // if the data is not empty
            let jsonTemps = {
                "temperatures": temperatures
            }
            axios.post("http://localhost:5000/calc", jsonTemps)
                .then(res => {
                    setIsSubmitted(true);
                    setClosestValue(res.data);
                    createDataPoints();
                })
                .catch(err => {
                    setIsValid(false);
                    setErrMessage(err.response.data.error);
                    setIsSubmitted(false);
                    setClosestValue(null);
                });
        } else {
            setIsValid(false);
            setErrMessage("No data provided - enter the temperatures and try again.")
        }
    }

    // formats data points for the chart
    const createDataPoints = () => {
        let points = [temperatures.length];
        for (let i = 0; i < temperatures.length; i++) {
            // creates data points for chart, setting the color to orange if the temperature is above 0, blue if it is not
            points[i] = { y: temperatures[i], ...((temperatures[i] > 0) ? { color: "#ffcc00" } : { color: "#6699ff" }) }
            if (temperatures[i] === closestValue) { // displays value closest to 0 in red
                points[i].indexLabelFontColor = "red";
            }
        }
        setTemperaturePoints(points);
    }

    // Converts temperature input to a numerical array
    const updateTemps = (temps) => {
        if (temps !== "") {
            let tempArray = temps.split(",");
            for (let i = 0; i < tempArray.length; i++) {
                tempArray[i] = Number(tempArray[i]);
                if (isNaN(tempArray[i])) { // value is not numerical
                    setErrMessage("Enter numerical values only.");
                    setIsValid(false);
                    return;
                }
            };
            setIsValid(true);
            setTemperatures(tempArray);
        } else {
            setErrMessage("No data provided - enter the temperatures and try again.")
            setIsValid(false);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col w-25">
                    <div className="row">
                        <form onSubmit={submitTemps}>
                            <label for="temp" className="row mb-2">Write temperatures separated by commas:</label>
                            <input type="text" id="temp" className="row w-75" onChange={e => updateTemps(e.target.value)} />
                            <button className="btn btn-primary mt-4 row" disabled={!isValid}>Submit</button>
                        </form>
                    </div>
                    <div className="row w-75 mt-5">
                        {isSubmitted ? (<div className="row alert alert-info">The value closest to 0 is {closestValue}.</div>) : ("")}
                        {isValid ? ("") : (<div className="row alert alert-danger">{errMessage}</div>)}
                    </div>
                </div>
                <div className="col w-25">
                    {isSubmitted ? (<CanvasJSChart options={options} />) : (<div className="row alert alert-info">Submit temperatures to view data.</div>)}
                </div>
            </div>

        </div >
    );
}

export default Temperatures;