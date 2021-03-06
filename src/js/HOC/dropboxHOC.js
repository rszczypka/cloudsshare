import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import dropboxIcon from "../../img/Dropbox-icon.png";
import {dropboxFetchFiles} from "../actions/dropboxFetchFiles";
import DropboxSDK from 'dropbox';
import dropboxLogout from "../actions/dropboxLogout";


function dropboxHOC(WrappedComponent) {
    class Dropbox extends Component {
        constructor(props) {
            super(props);
            this.downloadFile = this.downloadFile.bind(this);
        }

        static fullPathToFolder(data) {
            return data.path_lower;
        }

        static isFolder(data) {
            return data['.tag'] === "folder";
        }

        static extractData(value) {
            return value.metadata || value;
        }

        searchOrFetch() {
            const {data} = this.props;
            if (data.entries) { // fetch data
                return data.entries;
            } else { // else search
                return data.matches;
            }
        }

        downloadFile(path) {
            const dbx = new DropboxSDK({accessToken: this.props.token});
            const request = dbx.filesDownload({path});
            request.then((response) => {
                let downloadUrl = URL.createObjectURL(response.fileBlob);
                window.open(downloadUrl, response.name);
            });
        }

        render() {
            const newProps = {};
            newProps.icon = dropboxIcon;
            newProps.title = "Dropbox";
            newProps.fetchData = this.props.actionFetchDB;
            newProps.data = this.searchOrFetch();
            newProps._HOC = true;
            newProps.fullPathToFolder = Dropbox.fullPathToFolder;
            newProps.isFolder = Dropbox.isFolder;
            newProps.downloadFile = this.downloadFile;
            newProps.downloadValue = "path_lower";
            newProps.extractData = Dropbox.extractData;
            newProps.logout = this.props.dropboxLogout;
            return <WrappedComponent {...this.props} {...newProps}/>
        }
    }

    function mapStateToProps(state) {
        return state;
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({actionFetchDB: dropboxFetchFiles, dropboxLogout}, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(Dropbox)
}

export default dropboxHOC;