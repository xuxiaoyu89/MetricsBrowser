import { Component } from "react";
import AxiosDigestAuth from '@mhoc/axios-digest-auth';

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
        const digestAuth = new AxiosDigestAuth({
            username: this.apiPublicKey,
            password: this.apiPrivateKey,
        });

        digestAuth.request({
            headers: { Accept: "application/json" },
            method: "GET",
            url: this.getBaasMetricsPublicUrl(this.groupID, this.appID),
        });


        // parse response: get all the metrics names
        const seriesNames = ["xiaoyu", "qinhua", "alan", "gloria"];
        document.getElementById("seriesSelector").innerHTML = seriesNames;
    }
}

export default SeriesView;
