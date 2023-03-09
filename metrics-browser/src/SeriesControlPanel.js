import { Component } from "react";


class SeriesControlPanel extends Component {
    // name: selected, 
    // state:
    constructor(props) {
        super(props);
        this.metrics = props.metrics;
    }

    render() {
        const metricNameList = [];
        for (const name in this.metrics) {
            metricNameList.push(<div><button>{name}</button></div>)
        }
        return metricNameList;
    }


    componentDidMount() {

    }

}

export default SeriesControlPanel;