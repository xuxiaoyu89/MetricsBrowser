import "./ChartsPanel.css"
import { Component } from 'react';
import Dygraph from 'dygraphs';

class ChartsPanel extends Component {
    render() {
        const chartContainers = [];
        this.props.measurements.forEach(measurement => {
            if (this.props.metrics[measurement.name]) {
                chartContainers.push(<div key={measurement.name} id={measurement.name} className="chart"></div>);
            }
        });

        return chartContainers;
    }

    componentDidMount() {
        this.props.measurements.forEach(measurement => {
            if (this.props.metrics[measurement.name]) {
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
            }
        });
    }

    componentDidUpdate() {
        this.props.measurements.forEach(measurement => {
            if (this.props.metrics[measurement.name]) {
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
            }
        });
    }

}

export default ChartsPanel;