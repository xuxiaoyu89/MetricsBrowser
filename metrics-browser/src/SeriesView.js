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

        this.hostID = "";
    }

    getBaasMeasurementsPublicUrl(groupID, applicationID) {
        return `/api/atlas/v1.0/groups/${groupID}/application/${applicationID}/realm/measurements?granularity=PT1M&period=PT1H`;
    }

    getBaasMetricsPublicUrl(groupID, applicationID) {
        return `/api/atlas/v1.0/groups/${groupID}/application/${applicationID}/realm/metrics`;
    }


    // curl --user "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba" --digest --header "Content-Type: application/json" --include --request GET "http://localhost:8080/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/metrics"

    // curl --user "bjwqwyko:36d0ac8b-df27-49e1-8498-fcfd451660ba" --digest --header "Content-Type: application/json" --include --request GET "http://localhost:8080/api/atlas/v1.0/groups/63ff7f8397f5ea615df7db2e/application/636276a6dab3c68df06a73ad/realm/measurements?granularity=PT1M&period=PT1H"

    render() {
        return <div id="seriesSelector"></div>;
    }

    componentDidMount() {
        const metricsUrl = this.getBaasMetricsPublicUrl(this.groupID, this.appID);
        // call api
        // const digestAuth = new AxiosDigestAuth({
        //     username: this.apiPublicKey,
        //     password: this.apiPrivateKey,
        // });

        // digestAuth.request({
        //     headers: { Accept: "application/json" },
        //     method: "GET",
        //     url: metricsUrl,
        // }).then(response => {console.log(response)});

        // digestAuthRequest
        var getRequest = new digestAuthRequest('GET', metricsUrl, this.apiPublicKey, this.apiPrivateKey);
        // make the request
        getRequest.request(function(data) { 
            console.log("success!!!!!!!!!");
            console.log("data: ", data);
        },function(errorCode) { 
            console.log("error: ", errorCode);
        });



        // parse response: get all the metrics names
        const seriesNames = ["xiaoyu", "qinhua", "alan", "gloria"];
        document.getElementById("seriesSelector").innerHTML = seriesNames;
    }
}

export default SeriesView;
