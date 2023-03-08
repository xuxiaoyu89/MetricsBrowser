import "./SeriesView.css"
import { Component } from "react";
import digestAuthRequest from 'digest-auth-request';

class SeriesView extends Component {
    constructor(props) {
        super(props);
        // this.apiPublicKey = "ywdpojic";
        // this.apiPrivateKey = "85824e2e-02f0-42c8-aa67-079879e9edb8";
        // this.groupID = "61829a294c0dd40aeae25af1";
        // this.appID = "636276a6dab3c68df06a73ad";
        this.apiPublicKey = "bjwqwyko";
        this.apiPrivateKey = "36d0ac8b-df27-49e1-8498-fcfd451660ba";
        this.groupID = "63ff7f8397f5ea615df7db2e";
        this.appID = "636276a6dab3c68df06a73ad";
        this.metricsNames = [];
        this.hostID = "";

        this.showMetricsNames = this.showMetricsNames.bind(this);
        this.showMetrics = this.showMetrics.bind(this);
        this.showMetricsStyle = {
            display: "none"
        };
    }

    getBaasMeasurementsPublicUrl(groupID, applicationID, metricsNames) {
        const url = `/api/atlas/v1.0/groups/${groupID}/application/${applicationID}/realm/measurements?granularity=PT1M&period=PT1H`
        const queries = [];
        metricsNames.forEach(name => {
            queries.push(`?metrics=${name}`);
        });

        return `${url}${queries.join("&")}`;
    }

    getBaasMetricsPublicUrl(groupID, applicationID) {
        return `/api/atlas/v1.0/groups/${groupID}/application/${applicationID}/realm/metrics`;
    }
    // curl --user "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba" --digest --header "Content-Type: application/json" --include --request GET "http://localhost:8080/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/metrics"
    // curl --user "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba" --digest --header "Content-Type: application/json" --include --request GET "http://localhost:8080/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/measurements?granularity=PT1M&period=PT1H"
    render() {
        return <div>
            <button onClick={this.showMetricsNames}>Show Avaiable Metrics</button>
            <div id="seriesSelector" className="seriesSelector"></div>
            <button id="showMetrics" onClick={this.showMetrics} style={this.showMetricsStyle}>Display Selected Metrics</button>
        </div>;
    }

    metricsNameHandler(data) {
        const selectorElem = document.getElementById("seriesSelector");
        data.metrics.forEach(metric => {
            const node = document.createElement("div");
            node.innerHTML = `${metric.metricName}, ${metric.units}`;
            selectorElem.appendChild(node);
        });
    }

    measurementsHandler(data) {
        console.log(data);
    }

    showMetricsNames() {
        const metricsUrl = this.getBaasMetricsPublicUrl(this.groupID, this.appID);
        // call api
        const getRequest = new digestAuthRequest('GET', metricsUrl, this.apiPublicKey, this.apiPrivateKey);
        getRequest.request(this.metricsNameHandler,function(errorCode) { 
            console.log("error: ", errorCode);
        });
        document.getElementById("showMetrics").style.display = "block";
    }

    showMetrics() {
        const measurementsUrl = this.getBaasMeasurementsPublicUrl(this.groupID, this.appID, this.metricsNames);
        // call api
        const getRequest = new digestAuthRequest('GET', measurementsUrl, this.apiPublicKey, this.apiPrivateKey);
        getRequest.request(this.measurementsHandler,function(errorCode) { 
            console.log("error: ", errorCode);
        });
    }
}

export default SeriesView;
