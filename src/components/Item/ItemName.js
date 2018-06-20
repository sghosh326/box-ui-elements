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

type Props = {
    item: BoxItem,
    canPreview: boolean,
    onClick: Function,
    onFocus?: Function,
    isTouch: boolean
};

const ItemName = ({ item, onClick, onFocus, canPreview, isTouch }: Props) => {
    const { name, type, file_version_num }: BoxItem = item;
    const onItemFocus = onFocus ? () => onFocus(item) : null;
    const onItemClick: Function = (): void => onClick(item);

    return type === TYPE_FOLDER || (!isTouch && (type === TYPE_WEBLINK || canPreview)) ? (
    	<div>
	    	<PlainButton type='button' className='be-item-label' onFocus={onItemFocus} onClick={onItemClick}>
	            {name}
	        </PlainButton>
			{file_version_num && file_version_num !== 0 && file_version_num !== 1 &&
				<span className='be-item-version-label'>V{file_version_num}</span>
			}
		</div>	
    ) : (
		<div>
			<span className='be-item-label'>{name}</span>
			{file_version_num && file_version_num !== 0 && file_version_num !== 1 &&
				<span className='be-item-version-label'>V{file_version_num}</span>
			}
		</div>
    );
};

export default ItemName;
