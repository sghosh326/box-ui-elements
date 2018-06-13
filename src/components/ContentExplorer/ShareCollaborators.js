import React from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../messages';

class ShareCollaborators extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: [] };
    }

    onChange = (value) => {
        this.setState({
            value
        });
        this.props.onChangeCollabs(value);
    };

    onFocus = (value) => {
        this.props.onFocusCollabs();
    };

    getCollabs = (input) => 
        //		if (!input) {
        //			return Promise.resolve({ options: [] });
        //		}

        fetch(`/box-admin/box-ui-proxy/searchCollaborator/${this.props.rootId}?q=${input}`)
            .then((response) => response.json())
            .then((json) => ({ options: json.items }))
    ;

    render() {
        return (
            <Select.Async
                multi={true}
                value={this.state.value}
                onChange={this.onChange}
                onFocus={this.onFocus}
                loadOptions={this.getCollabs}
                backspaceRemoves={true}
                placeholder={this.props.intl.formatMessage(messages.emailSharedLinkPlaceholder)}
                style={{ height: 60 }}
            />
        );
    }
}

export default injectIntl(ShareCollaborators);
