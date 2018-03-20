import React from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import Datefield from '../Date';
import { VIEW_RECENTS } from '../../constants';
import type { BoxItem, View } from '../../flowTypes';
import './ModifiedCell.scss';

type Props = {
    item: BoxItem,
    view: View,
    intl: any
};

const ItemModified = ({ view, item, intl }: Props) => {
    const { modified_at = '', interacted_at = '', modified_by, description }: BoxItem = item;
    const isRecents: boolean = view === VIEW_RECENTS;
    const date: string = isRecents ? interacted_at || modified_at : modified_at;
    const namePos: int =
        description && description.indexOf('By:') != -1 ? description.indexOf('By:') + 'By:'.length + 1 : -1;
    const tsPos: int =
        description && description.indexOf('at:') != -1 ? description.indexOf('at:') + 'at:'.length + 1 : -1;
    const tsDesc: long = tsPos != -1 ? Date.parse(description.substring(tsPos).trim()) : -1;
    const tsModified: long = Date.parse(modified_at);
    const modifiedByName =
        tsModified > tsDesc && modified_by
            ? modified_by.name
            : namePos !== -1 && tsPos !== -1
                ? description.substring(namePos, description.indexOf('at:')).trim()
                : namePos !== -1 && tsPos === -1
                    ? description.substring(namePos).trim()
                    : modified_by ? modified_by.name : '';
    const byLabel = intl.formatMessage(messages.by);

    return (
        <span className='be-item-modified'>
            <Datefield date={date} />&nbsp;{byLabel}&nbsp;{modifiedByName}
        </span>
    );
};

export default injectIntl(ItemModified);
