import React from 'react';
import ReactDOM from 'react-dom';
import TreeSelect, { SHOW_PARENT } from 'rc-tree-select';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../messages';
import Xhr from '../../util/Xhr';

class SelectDestFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            treeData: props.moveCopySharedFolders
            //          treeDataMode: {
            //              id: 'id',
            //              rootPId: 0
            //          }
        };
        //        this.treeData = [];
    }

    onChange = (value) => {
        this.setState({
            value
        });
        this.props.onSelectDestFolder(value);
    };

    recursiveAddChildren = (entityId, treeNodes, children) => {
        for (let i = 0; i < treeNodes.length; i++) {
            if (treeNodes[i].children) {
                if (this.recursiveAddChildren(entityId, treeNodes[i].children, children)) {
                    return true;
                }
            }
            if (treeNodes[i].value === entityId) {
                treeNodes[i].children = children;
                return true;
            }
        }
        return false;
    };

    disableCurrNode = (treeNodes) => {
        for (let i = 0; i < treeNodes.length; i++) {
            if (treeNodes[i].children) {
                this.disableCurrNode(treeNodes[i].children);
            }
            if (treeNodes[i].value === this.props.currentFolderId) {
                treeNodes[i].disabled = true;
            } else {
                treeNodes[i].disabled = false;
            }
        }
    };

    onLoadData = (treeNode) => {
        console.log(`Tree Node ID: ${  treeNode.value}`);
        return new Promise((resolve) => {
            const self = this;
            const entityId = treeNode.props.value;
            const token = this.props.token;
            $.getJSON(`/box-admin/box-ui-proxy/treeChildFolders/${  entityId  }?token=${  token}`, (data) => {
                const treeData = self.state.treeData;
                self.recursiveAddChildren(entityId, treeData, data.items);
                self.disableCurrNode(treeData);
                self.setState({
                    treeData
                });
                resolve();
            });
        });
    };

    /*
    getTreeData = () => {
        this.treeData = this.props.onSearchDestFolders(this.props.currentFolderId);
    };
    */

    render() {
        // this.getTreeData();
        this.disableCurrNode(this.state.treeData);
        return (
            <TreeSelect
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                placeholder={this.props.intl.formatMessage(messages.searchFolderPlaceholder)}
                // searchPlaceholder={this.props.intl.formatMessage(messages.searchFolderPlaceholder)}
                treeIcon={true}
                treeCheckable={false}
                showSearch={false}
                multiple={false}
                inputValue={null}
                value={this.state.value}
                treeData={this.state.treeData}
                treeDataSimpleMode={false}
                // treeDataSimpleMode={this.state.treeDataMode}
                // showCheckedStrategy={SHOW_PARENT}
                onChange={this.onChange}
                loadData={this.onLoadData}
            />
        );
    }
}

export default injectIntl(SelectDestFolder);
