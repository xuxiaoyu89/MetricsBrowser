import { Component } from "react";


class SeriesControlPanel extends Component {
    render() {
        const metricNameList = [];
        for (const name in this.props.metrics) {
            metricNameList.push(<div>
                <button id={name} style={{ backgroundColor: this.props.metrics[name] ? 'blue' : 'white' }} onClick={this.props.toggleMetricName.bind(this, name)}>{name}</button>
            </div>);
        }
        return metricNameList;
    }
}

export default SeriesControlPanel;