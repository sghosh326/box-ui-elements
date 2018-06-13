import React from 'react';
import ReactDOM from 'react-dom';
import TreeSelect, { SHOW_PARENT } from 'rc-tree-select';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../messages';

class SelectDestFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            treeDataMode: {
                id: 'id',
                rootPId: 0
            }
        };
        this.treeData = [];
    }

    onChange = (value) => {
        this.setState({
            value
        });
        this.props.onSelectDestFolder(value);
    };

    getTreeData = () => {
        this.treeData = this.props.onSearchDestFolders(this.props.currentFolderId);
    };

    render() {
        this.getTreeData();
        return (
            <TreeSelect
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                placeholder={this.props.intl.formatMessage(messages.searchFolderPlaceholder)}
                searchPlaceholder={this.props.intl.formatMessage(messages.searchFolderPlaceholder)}
                treeIcon={true}
                treeCheckable={false}
                multiple={false}
                inputValue={null}
                value={this.state.value}
                treeData={this.treeData}
                treeDefaultExpandAll={true}
                treeNodeFilterProp='title'
                treeDataSimpleMode={this.state.treeDataMode}
                showCheckedStrategy={SHOW_PARENT}
                onChange={this.onChange}
            />
        );
    }
}

export default injectIntl(SelectDestFolder);
