import { Component } from "react";

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

        this.hostID = "";
    }

    getBaasMeasurementsPublicUrl(groupID, applicationID) {
        return `http://localhost:8080/api/atlas/v1.0/groups/${groupID}/application/${applicationID}/realm/measurements?granularity=PT1M&period=PT1H`;
    }

    getBaasMetricsPublicUrl(groupID, applicationID) {
        return `http://localhost:8080/api/atlas/v1.0/groups/${groupID}/application/${applicationID}/realm/metrics`;
    }


// curl --user "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba" --digest --header "Content-Type: application/json" --include --request GET "http://localhost:8080/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/metrics"

// curl --user "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba" --digest --header "Content-Type: application/json" --include --request GET "http://localhost:8080/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/measurements?granularity=PT1M&period=PT1H"

    render() {
        return <div id="seriesSelector"></div>;
    }

    componentDidMount() {
        // call api
        // request(this.getBaasMetricsPublicUrl(this.groupID, this.appID), {
        //     method: "GET",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     digestAuth: "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba"
        // }).then((data, res) => {
        //     console.log('status: %s, body size: %d, headers: %j', res.statusCode, data.length, res.headers);
        // });



        // const metricsResponse = fetch(this.getBaasMetricsPublicUrl(this.groupID, this.appID), {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Digest username="bjwqwyko", realm="MMS Public API", nonce="Vj06lGncDguD/J/hux1UshZd4tZ4zT+j", uri="/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/metrics", cnonce="OTcyNTY0ZGQ2YWNmY2Y4M2Q5YmJhZDhjZWJjZjcyZjM=", nc=00000001, qop=auth, response="27fbce00ff3ae634b82eb813c8c673f9", algorithm=MD5`
        //     }
        // });

        // console.log("metrics: " + metricsResponse);

        // const measurementsResponse = fetch(this.getBaasMeasurementsPublicUrl(this.groupID, this.appID), {
        //     method: "GET",
        //     headers: {
        //         "access-control-allow-origin" : "*",
        //         "Content-Type": "application/json",
        //         "Authorization": `Digest username="bjwqwyko", realm="MMS Public API", nonce="Vj06lGncDguD/J/hux1UshZd4tZ4zT+j", uri="/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/metrics", cnonce="OTcyNTY0ZGQ2YWNmY2Y4M2Q5YmJhZDhjZWJjZjcyZjM=", nc=00000001, qop=auth, response="27fbce00ff3ae634b82eb813c8c673f9", algorithm=MD5`
        //     }
        // });

        // console.log("measurements: " + measurementsResponse);

        // parse response: get all the metrics names
        const seriesNames = ["xiaoyu", "qinhua", "alan", "gloria"];
        document.getElementById("seriesSelector").innerHTML = seriesNames;
    }
}

export default SeriesView;
