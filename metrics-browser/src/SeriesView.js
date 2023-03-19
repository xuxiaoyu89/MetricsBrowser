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


        // dev realm 
        // this.apiPublicKey = "quikryew"; hjotoobm
        // this.apiPrivateKey = "63664e4b-fa34-4819-aa02-07324af7e5cc"; dedbc536-ad4a-4a0a-a2d7-f61e99727b98
        // this.groupID = "60ad6d0cb54e70155ff5ac5a";
        // this.appID = "63fd1f9aacfde0fcb6120a88";

        // local realm
        // this.apiPublicKey = "mzsdkqps"
        // this.apiPrivateKey = "84b411e1-147f-425c-93ae-ace2effe8c41"
        // this.groupID = "63ff7f8397f5ea615df7db2e";
        // this.appID = "6290dff44c7eaf091c2efa79";

        this.showRealmMetrics = this.showRealmMetrics.bind(this);
        this.showHostMetrics = this.showHostMetrics.bind(this);
        this.measurementsHandler = this.measurementsHandler.bind(this);
        this.toggleMetricName = this.toggleMetricName.bind(this);
        this.handleGroupIDChange = this.handleGroupIDChange.bind(this);
        this.handleAppIDChange = this.handleAppIDChange.bind(this);
        this.handleHostNameChange = this.handleHostNameChange.bind(this);
        this.handlePublicKeyChange = this.handlePublicKeyChange.bind(this);
        this.handlePrivateKeyChange = this.handlePrivateKeyChange.bind(this);
        this.fetchMeasurements = this.fetchMeasurements.bind(this);

        this.MeasurementUrl = "";

        this.showMetricsStyle = {
            display: "none"
        };

        this.state = {
            groupID: "60ad6d0cb54e70155ff5ac5a",
            appID: "63fd1f9aacfde0fcb6120a88",
            hostName: "",
            publicKey: "quikryew",
            privateKey: "63664e4b-fa34-4819-aa02-07324af7e5cc",
            metrics: {}, // {metricName: checked}
            measurements: []
        };
    }

    getBaasMeasurementsPublicUrl(groupID, applicationID) {
        const url = `https://cloud-dev.mongodb.com/api/atlas/v1.0/groups/${groupID}/application/${applicationID}/realm/measurements?granularity=PT1M&period=PT1H`;
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
            <div className="input-table">
                <table>
                    <tr>
                        <th><label className="input-label">GroupID: </label></th>
                        <th><input className="input-text" type="text" value={this.state.groupID} onChange={this.handleGroupIDChange}></input></th>
                    </tr>
                    <tr>
                        <th><label className="input-label">HostName: </label></th>
                        <th><input className="input-text" type="text" value={this.state.hostName} onChange={this.handleHostNameChange}></input></th>
                    </tr>
                    <tr>
                        <th><label className="input-label">AppID (for Realm): </label></th>
                        <th><input className="input-text" type="text" value={this.state.appID} onChange={this.handleAppIDChange}></input></th>
                    </tr>
                    <tr>
                        <th><label className="input-label">Public Key: </label></th>
                        <th><input className="input-text" type="text" value={this.state.publicKey} onChange={this.handlePublicKeyChange}></input></th>
                    </tr>
                    <tr>
                        <th><label className="input-label">Private Key: </label></th>
                        <th><input className="input-text" type="text" value={this.state.privateKey} onChange={this.handlePrivateKeyChange}></input></th>
                    </tr>
                </table>
            </div>
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
            if (this.state.metrics[measurement.name] == true) {
                newMetrics[measurement.name] = true;    
            } else {
                newMetrics[measurement.name] = false;
            }
        });

        this.setState({
            metrics: newMetrics,
            measurements: data.measurements
        });
    }

    showHostMetrics() {
        this.MeasurementUrl = this.getHostMetricsPublicUrl(this.state.groupID, this.state.hostName);
        this.fetchMeasurements();
    }

    showRealmMetrics() {
        this.MeasurementUrl = this.getBaasMeasurementsPublicUrl(this.state.groupID, this.state.appID);
        this.fetchMeasurements();
    }

    fetchMeasurements() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: this.MeasurementUrl,
                publicKey: this.state.publicKey,
                privateKey: this.state.privateKey
            })
        };
        fetch('/api', requestOptions)
        .then(response => response.json())
        .then(this.measurementsHandler.bind(this));

        setInterval(this.fetchMeasurements.bind(this), 5000);
    }
}

export default SeriesView;
