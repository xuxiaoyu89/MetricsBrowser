import "./ChartsPanel.css"
import { Component } from 'react';
import Dygraph from 'dygraphs';

class ChartsPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            measurements: this.props.measurements
        };
    }

    render() {
        const chartContainers = [];
        this.state.measurements.forEach(measurement => {
            chartContainers.push(<div id={measurement.name} className="chart"></div>);
        });

        return chartContainers;
    }

    componentDidMount() {
        this.state.measurements.forEach(measurement => {
            new Dygraph(
                document.getElementById(measurement.name),
                // For possible data formats, see http://dygraphs.com/data.html
                // The x-values could also be dates, e.g. "2012/03/15"
                measurement.dataPoints.map(entry => [Date.parse(entry.timestamp), entry.value]),
                {
                    // options go here. See http://dygraphs.com/options.html
                    legend: 'always',
                    animatedZooms: true,
                    title: measurement.name
                });
        });
    }

}

export default ChartsPanel;