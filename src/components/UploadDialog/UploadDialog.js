/**
 * @flow
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import { injectIntl } from 'react-intl';
import ContentUploader from '../ContentUploader';
import SubHeaderLeft from '../SubHeader/SubHeaderLeft';
import messages from '../messages';
import { CLASS_MODAL_CONTENT_FULL_BLEED, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';
import type { Token } from '../../flowTypes';

type Props = {
    isOpen: boolean,
    currentFolderId: string,
    token: Token,
    sharedLink?: string,
    sharedLinkPassword?: string,
    apiHost: string,
    uploadHost: string,
    onClose: Function,
    parentElement: HTMLElement,
    appElement: HTMLElement,
    onUpload: Function,
    requestInterceptor?: Function,
    responseInterceptor?: Function,
    intl: any
};

/* eslint-disable jsx-a11y/label-has-for */
const UploadDialog = ({
    isOpen,
    currentFolderId,
    token,
    sharedLink,
    sharedLinkPassword,
    apiHost,
    uploadHost,
    onClose,
    parentElement,
    view,
    rootId,
    isSmall,
    rootName,
    currentCollection,
    onItemClick,
    appElement,
    onUpload,
    requestInterceptor,
    responseInterceptor,
    intl
}: Props) => (
    <Modal
        isOpen={isOpen}
        parentSelector={() => parentElement}
        portalClassName={`${CLASS_MODAL} be-modal-upload`}
        className={CLASS_MODAL_CONTENT_FULL_BLEED}
        overlayClassName={CLASS_MODAL_OVERLAY}
        onRequestClose={onClose}
        contentLabel={intl.formatMessage(messages.upload)}
        appElement={appElement}
    >
        <div className='be-sub-header' style={{ paddingBottom: 15 }}>
            <SubHeaderLeft
                rootId={rootId}
                rootName={rootName}
                rootElement={parentElement}
                onItemClick={onItemClick}
                currentCollection={currentCollection}
                view={view}
                isSmall={isSmall}
            />
        </div>
        <ContentUploader
            rootFolderId={currentFolderId}
            token={token}
            sharedLink={sharedLink}
            sharedLinkPassword={sharedLinkPassword}
            apiHost={apiHost}
            uploadHost={uploadHost}
            onClose={onClose}
            onComplete={onUpload}
            requestInterceptor={requestInterceptor}
            responseInterceptor={responseInterceptor}
        />
    </Modal>
);

export default injectIntl(UploadDialog);
