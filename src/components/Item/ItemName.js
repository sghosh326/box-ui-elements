/**
 * @flow
 * @file Component for the details for the item name
 * @author Box
 */

import React from 'react';
import PlainButton from 'box-react-ui/lib/components/plain-button/PlainButton';
import { TYPE_FOLDER, TYPE_WEBLINK } from '../../constants';
import type { BoxItem } from '../../flowTypes';
import './ItemName.scss';
import Button from 'box-react-ui/lib/components/button/Button';
import DropdownMenu from 'box-react-ui/lib/components/dropdown-menu/DropdownMenu';
import Menu from 'box-react-ui/lib/components/menu/Menu';
import MenuItem from 'box-react-ui/lib/components/menu/MenuItem';

type Props = {
    item: BoxItem,
    canPreview: boolean,
    onClick: Function,
    onItemDownloadVersion: Function,
    onFocus?: Function,
    isTouch: boolean,
    rootElement: HTMLElement
};

const ItemName = ({ item, onClick, onItemDownloadVersion, onFocus, canPreview, isTouch, rootElement }: Props) => {
    const { name, type, version_info, id }: BoxItem = item;
    const onItemFocus = onFocus ? () => onFocus(item) : null;
    const onItemClick: Function = (): void => onClick(item);
    const onDownloadVersion: Function = (e): void => {
        onItemDownloadVersion(e.currentTarget.id);
    };

    let file_version_num = null;
    if (version_info) {
        file_version_num = version_info.total_count;
    }

    const menuItemNames = [];
    if (file_version_num && file_version_num !== 0 && file_version_num !== 1) {
        for (let i = 1; i < file_version_num; i++) {
            menuItemNames.push(`Download Version ${  i}`);
        }
    }

    const menuItemsList = menuItemNames.map((menuItemName, index) => (
        <MenuItem
            key={version_info.entries[index].id}
            id={version_info.entries[index].id}
            onClick={onDownloadVersion}
        >
            {menuItemName}
        </MenuItem>
    ));
    return type === TYPE_FOLDER || (!isTouch && (type === TYPE_WEBLINK || canPreview)) ? (
        <div>
            <PlainButton type='button' className='be-item-label' onFocus={onItemFocus} onClick={onItemClick}>
                {name}
            </PlainButton>
            {file_version_num &&
                file_version_num !== 0 &&
                file_version_num !== 1 && (
                <DropdownMenu isRightAligned constrainToScrollParent bodyElement={rootElement}>
                    <Button className='be-item-version-menu' type='button' onFocus={onItemFocus}>
                        <span className='be-item-version-label'>V{file_version_num}</span>
                    </Button>
                    <Menu>{menuItemsList}</Menu>
                </DropdownMenu>
            )}
        </div>
    ) : (
        <div>
            <span className='be-item-label'>{name}</span>
            {file_version_num &&
                file_version_num !== 0 &&
                file_version_num !== 1 && <span className='be-item-version-label'>V{file_version_num}</span>}
        </div>
    );
};

export default ItemName;
