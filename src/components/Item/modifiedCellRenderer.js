import React from 'react';
import ItemModified from './ItemModified';
import { VIEW_SEARCH } from '../../constants';
import type { View, BoxItem } from '../../flowTypes';

export default (rootId: string, view: View) => ({ rowData }: { rowData: BoxItem }) => (
    <ItemModified item={rowData} view={view} />
);
