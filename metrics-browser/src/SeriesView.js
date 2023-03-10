import "./SeriesView.css"
import "./ChartsPanel.css"
import { Component } from "react";
import ChartsPanel from './ChartsPanel';
import SeriesControlPanel from './SeriesControlPanel';
import ReactDOM from 'react-dom';

class SeriesView extends Component {
    constructor(props) {
        super(props);
        // dev host
        // this.apiPublicKey = "wpxwqywn";
        // this.apiPrivateKey = "4aa12eb9-2c32-4c9e-b490-856718ec92fb";
        // this.groupID = "62cc9024a892252291329616";
        // this.hostName = "c1dd12078c0013ba0cf444a1b3c14d54";

        // this.apiPublicKey = "bjwqwyko";
        // this.apiPrivateKey = "36d0ac8b-df27-49e1-8498-fcfd451660ba";
        // this.groupID = "63ff7f8397f5ea615df7db2e";
        // this.appID = "636276a6dab3c68df06a73ad";
        // this.hostName = "";
        this.showRealmMetrics = this.showRealmMetrics.bind(this);
        this.showHostMetrics = this.showHostMetrics.bind(this);
        this.measurementsHandler = this.measurementsHandler.bind(this);
        this.toggleMetricName = this.toggleMetricName.bind(this);
        this.handleGroupIDChange = this.handleGroupIDChange.bind(this);
        this.handleAppIDChange = this.handleAppIDChange.bind(this);
        this.handleHostNameChange = this.handleHostNameChange.bind(this);
        this.handlePublicKeyChange = this.handlePublicKeyChange.bind(this);
        this.handlePrivateKeyChange = this.handlePrivateKeyChange.bind(this);

        this.showMetricsStyle = {
            display: "none"
        };

        this.state = {
            groupID: "62cc9024a892252291329616",
            appID: "",
            hostName: "cluster0-shard-00-02.fl2vu.mongodb-dev.net:27017",
            publicKey: "wpxwqywn",
            privateKey: "4aa12eb9-2c32-4c9e-b490-856718ec92fb",
            metrics: {}, // {metricName: checked}
            measurements: []
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

    getHostMetricsPublicUrl(groupID, hostName) {
        return `https://cloud-dev.mongodb.com/api/atlas/v1.0/groups/${groupID}/processes/${hostName}/measurements?granularity=PT1M&period=PT1H`;
    }


    // curl --user "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba" --digest --header "Content-Type: application/json" --include --request GET "http://localhost:8080/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/metrics"
    // curl --user "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba" --digest --header "Content-Type: application/json" --include --request GET "http://localhost:8080/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/measurements?granularity=PT1M&period=PT1H"


    handleGroupIDChange(e) {
        this.setState({ groupID: e.target.value });
    }

    handleAppIDChange(e) {
        this.setState({ appID: e.target.value });
    }

    handleHostNameChange(e) {
        this.setState({ hostName: e.target.value });
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
            <label>HostName: </label>
            <input type="text" value={this.state.hostName} onChange={this.handleHostNameChange}></input><br/>
            <label>AppID (for Realm): </label>
            <input type="text" value={this.state.appID} onChange={this.handleAppIDChange}></input><br/>
            <label>Public Key: </label>
            <input type="text" value={this.state.publicKey} onChange={this.handlePublicKeyChange}></input><br/>
            <label>Private Key: </label>
            <input type="text" value={this.state.privateKey} onChange={this.handlePrivateKeyChange}></input><br/>
            <div className="button-container">
                <button className="button1" onClick={this.showRealmMetrics}>Show Avaiable Realm Metrics</button>
                <button className="button1" onClick={this.showHostMetrics}>Show Avaiable Host Metrics</button>
            </div>
            <div id="chartsContainer" className="chartsContainer">
                <ChartsPanel measurements={this.state.measurements} metrics={this.state.metrics}/>
            </div>
            <div id="seriesSelector" className="seriesSelector">
                <SeriesControlPanel metrics={this.state.metrics} toggleMetricName={this.toggleMetricName} />
            </div>
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

    measurementsHandler(data) {
        console.log(data);

        const newMetrics = {};
        data.measurements.forEach(measurement => {
            newMetrics[measurement.name] = false;
        });

        this.setState({
            metrics: newMetrics,
            measurements: data.measurements
        });
    }

    showHostMetrics() {
        const metricsUrl = this.getHostMetricsPublicUrl(this.state.groupID, this.state.hostName);
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
            .then(this.measurementsHandler); 
    }

    showRealmMetrics() {
        const metricsUrl = this.getBaasMeasurementsPublicUrl(this.state.groupID, this.state.appID);

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
            .then(this.measurementsHandler);
    }
}

export default SeriesView;
