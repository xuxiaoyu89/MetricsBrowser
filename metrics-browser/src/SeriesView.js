import "./SeriesView.css"
import "./ChartsPanel.css"
import { Component } from "react";
import ChartsPanel from './ChartsPanel';
import SeriesControlPanel from './SeriesControlPanel';
import ReactDOM from 'react-dom';

class SeriesView extends Component {
    constructor(props) {
        super(props);
        // this.apiPublicKey = "ywdpojic";
        // this.apiPrivateKey = "85824e2e-02f0-42c8-aa67-079879e9edb8";
        // this.groupID = "61829a294c0dd40aeae25af1";
        // this.appID = "636276a6dab3c68df06a73ad";

        // this.apiPublicKey = "bjwqwyko";
        // this.apiPrivateKey = "36d0ac8b-df27-49e1-8498-fcfd451660ba";
        // this.groupID = "63ff7f8397f5ea615df7db2e";
        // this.appID = "636276a6dab3c68df06a73ad";
        // this.hostID = "";
        this.showMetricNames = this.showMetricNames.bind(this);
        this.showMetrics = this.showMetrics.bind(this);
        this.metricNameHandler = this.metricNameHandler.bind(this);
        this.toggleMetricName = this.toggleMetricName.bind(this);
        this.handleGroupIDChange = this.handleGroupIDChange.bind(this);
        this.handleAppIDChange = this.handleAppIDChange.bind(this);
        this.handleHostIDChange = this.handleHostIDChange.bind(this);
        this.handlePublicKeyChange = this.handlePublicKeyChange.bind(this);
        this.handlePrivateKeyChange = this.handlePrivateKeyChange.bind(this);

        this.showMetricsStyle = {
            display: "none"
        };

        this.state = {
            groupID: "63ff7f8397f5ea615df7db2e",
            appID: "636276a6dab3c68df06a73ad",
            hostID: "",
            publicKey: "bjwqwyko",
            privateKey: "36d0ac8b-df27-49e1-8498-fcfd451660ba",
            metrics: {} // {metricName: checked}
        };
    }

    getBaasMeasurementsPublicUrl(groupID, applicationID) {
        const url = `http://localhost:8080/api/atlas/v1.0/groups/${groupID}/application/${applicationID}/realm/measurements?granularity=PT1M&period=PT1H`;
        if (Object.keys(this.state.metrics).length === 0) {
            return url;
        }
        const queries = [];
        for (const name in this.state.metrics) {
            if (this.state.metrics[name]) {
                queries.push(`&metrics=${name}`);
            }
        };
        return `${url}${queries.join("")}`;
    }

    getBaasMetricsPublicUrl(groupID, applicationID) {
        return `http://localhost:8080/api/atlas/v1.0/groups/${groupID}/application/${applicationID}/realm/metrics`;
    }
    // curl --user "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba" --digest --header "Content-Type: application/json" --include --request GET "http://localhost:8080/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/metrics"
    // curl --user "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba" --digest --header "Content-Type: application/json" --include --request GET "http://localhost:8080/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/measurements?granularity=PT1M&period=PT1H"


    handleGroupIDChange(e) {
        this.setState({ groupID: e.target.value });
    }

    handleAppIDChange(e) {
        this.setState({ appID: e.target.value });
    }

    handleHostIDChange(e) {
        this.setState({ hostID: e.target.value });
    }

    handlePublicKeyChange(e) {
        this.setState({ publicKey: e.target.value });
    }

    handlePrivateKeyChange(e) {
        this.setState({ privateKey: e.target.value });
    }

    render() {
        return <>
            <label>GroupID: </label>
            <input type="text" value={this.state.groupID} onChange={this.handleGroupIDChange}></input><br/>
            <label>HostID: </label>
            <input type="text" value={this.state.hostID} onChange={this.handleHostIDChange}></input><br/>
            <label>AppID (for Realm): </label>
            <input type="text" value={this.state.appID} onChange={this.handleAppIDChange}></input><br/>
            <label>Public Key: </label>
            <input type="text" value={this.state.publicKey} onChange={this.handlePublicKeyChange}></input><br/>
            <label>Private Key: </label>
            <input type="text" value={this.state.privateKey} onChange={this.handlePrivateKeyChange}></input><br/>
            <div className="button-container">
                <button className="button1" onClick={this.showMetricNames}>Show Avaiable Metrics</button>
            </div>
            <div id="seriesView">
                <div id="seriesSelector" className="seriesSelector">
                    <SeriesControlPanel metrics={this.state.metrics} toggleMetricName={this.toggleMetricName} />
                </div>
            </div>
            <div className="button-container">
                <button className="button1" id="showMetrics" onClick={this.showMetrics} style={this.showMetricsStyle}>Display Selected Metrics</button>
            </div>
            <div id="chartsContainer" className="chartsContainer"></div>
        </>;
    }

    toggleMetricName(metricName, e) {
        if (metricName === undefined) {
            return;
        }
        const newMetrics = Object.create(this.state.metrics);
        newMetrics[metricName] = !this.state.metrics[metricName];
        this.setState({
            metrics: newMetrics
        });
    }

    metricNameHandler(data) {
        // update the metrics names using setter
        const newMetrics = {};
        data.metrics.forEach(metric => {
            newMetrics[metric.metricName] = false;
        });

        this.setState({
            metrics: newMetrics
        });
    }

    measurementsHandler(data) {
        const root = ReactDOM.createRoot(
            document.getElementById("chartsContainer")
        );
        root.render(<ChartsPanel measurements={data.measurements} />);
    }

    showMetricNames() {
        const metricsUrl = this.getBaasMetricsPublicUrl(this.state.groupID, this.state.appID);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: metricsUrl,
                publicKey: this.state.publicKey,
                privateKey: this.state.privateKey
            })
        };
        fetch('/api', requestOptions)
            .then(response => response.json())
            .then(this.metricNameHandler);
        document.getElementById("showMetrics").style.display = "block";
    }

    showMetrics() {
        const measurementsUrl = this.getBaasMeasurementsPublicUrl(this.state.groupID, this.state.appID);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: measurementsUrl,
                publicKey: this.state.publicKey,
                privateKey: this.state.privateKey
            })
        };
        fetch('/api', requestOptions)
            .then(response => response.json())
            .then(this.measurementsHandler);
    }
}

export default SeriesView;
