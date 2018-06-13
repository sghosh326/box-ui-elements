/**
 * @flow
 * @file Move or Copy Dialog
 * @author Sandip Ghosh
 */

import React from 'react';
import Modal from 'react-modal';
import noop from 'lodash/noop';
import { injectIntl, FormattedMessage } from 'react-intl';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import Button from 'box-react-ui/lib/components/button/Button';
import messages from '../messages';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL, ERROR_CODE_ITEM_NAME_IN_USE } from '../../constants';
import type { BoxItem } from '../../flowTypes';
import './ShareDialog.scss';
import SelectDestFolder from './SelectDestFolder';

type Props = {
    rootId: string,
    currentFolderId: string,
    token: string,
    isOpen: boolean,
    onMoveOrCopy: Function,
    onCancel: Function,
    onSearchDestFolders: Function,
    item: BoxItem,
    isLoading: boolean,
    errorCode: string,
    parentElement: HTMLElement,
    appElement: HTMLElement,
    intl: any
};

const MoveCopyDialog = ({
    rootId,
    currentFolderId,
    token,
    isOpen,
    onMoveOrCopy,
    onCancel,
    onSearchDestFolders,
    item,
    isLoading,
    errorCode,
    parentElement,
    appElement,
    intl
}: Props) => {
    let selFolderId = '';
    let error;

    const onSelectChildFolder = (selItemValue) => {
        selFolderId = selItemValue;
    };

    const move = () => {
        if (selFolderId && selFolderId.length) {
            console.log(`The selected Folder Id for Move: ${  selFolderId}`);
            onMoveOrCopy(selFolderId, false);
        }
    };

    const copy = () => {
        if (selFolderId && selFolderId.length) {
            console.log(`The selected Folder Id for Copy:${  selFolderId}`);
            onMoveOrCopy(selFolderId, true);
        }
    };

    switch (errorCode) {
        case ERROR_CODE_ITEM_NAME_IN_USE:
            error = messages.moveOrCopyDialogErrorInUse;
            break;
    }

    /* eslint-disable jsx-a11y/label-has-for */
    return (
        <Modal
            isOpen={isOpen}
            parentSelector={() => parentElement}
            portalClassName={`${CLASS_MODAL} be-modal-share`}
            className={CLASS_MODAL_CONTENT}
            overlayClassName={CLASS_MODAL_OVERLAY}
            onRequestClose={onCancel}
            contentLabel={intl.formatMessage(messages.moveOrCopyDialogLabel)}
            appElement={appElement}
        >
            <label>
                {error ? (
                    <div className='be-modal-error'>
                        <FormattedMessage {...error} />
                    </div>
                ) : null}
            </label>
            <div className='be-modal-content'>
                <div style={{ fontWeight: 'bold', marginBottom: '10' }}>
                    {intl.formatMessage(messages.folderSelectText)}
                </div>
                <SelectDestFolder
                    rootId={rootId}
                    currentFolderId={currentFolderId}
                    token={token}
                    onSelectDestFolder={onSelectChildFolder}
                    onSearchDestFolders={onSearchDestFolders}
                />
            </div>
            <div className='be-modal-btns pull-right'>
                <PrimaryButton type='button' onClick={move} isLoading={isLoading}>
                    <FormattedMessage {...messages.move} />
                </PrimaryButton>
                <PrimaryButton type='button' onClick={copy} isLoading={isLoading}>
                    <FormattedMessage {...messages.copy} />
                </PrimaryButton>
                <Button type='button' onClick={onCancel} isDisabled={isLoading}>
                    <FormattedMessage {...messages.cancel} />
                </Button>
            </div>
        </Modal>
    );
};

export default injectIntl(MoveCopyDialog);
