/**
 * @flow
 * @file Content Explorer Delete Confirmation Dialog
 * @author Box
 */

import React from 'react';
import Modal from 'react-modal';
import noop from 'lodash/noop';
import { injectIntl, FormattedMessage } from 'react-intl';
import PrimaryButton from 'box-react-ui/lib/components/primary-button/PrimaryButton';
import Button from 'box-react-ui/lib/components/button/Button';
import messages from '../messages';
import ShareAccessSelect from '../ShareAccessSelect';
import { CLASS_MODAL_CONTENT, CLASS_MODAL_OVERLAY, CLASS_MODAL } from '../../constants';
import type { BoxItem } from '../../flowTypes';
import './ShareDialog.scss';
import ShareCollaborators from './ShareCollaborators';

type Props = {
    rootId: string,
    canSetShareAccess: boolean,
    isOpen: boolean,
    onShareAccessChange: Function,
    onCancel: Function,
    item: BoxItem,
    isLoading: boolean,
    parentElement: HTMLElement,
    appElement: HTMLElement,
    intl: any
};

const ShareDialog = ({
    rootId,
    isOpen,
    canSetShareAccess,
    onShareAccessChange,
    onShare,
    onCancel,
    item,
    isLoading,
    parentElement,
    appElement,
    intl
}: Props) => {
    let textInput = null;
    let recipients = '';
    let messageInput = null;
    let collabs = [];

    const copy = () => {
        if (textInput instanceof HTMLTextAreaElement) {
            textInput.select();
            document.execCommand('copy');
        }
    };

    const onChangeCollabs = (collabsFromChild) => {
        collabs = collabsFromChild;
    };

    const onFocusCollabs = () => {
        const msgLabelElt = document.getElementById('sharedLinkMsg');
        msgLabelElt.style.display = 'block';
    };

    const sendEmail = () => {
        if (collabs && collabs.length) {
            for (let i = 0; i < collabs.length; i++) {
                if (recipients) {
                    recipients += ', ';
                }
                recipients += collabs[i].value;
            }
            console.log(`The recipients are: ${  recipients}`);
            onShare(recipients, messageInput.value);
        }
    };

    const generateLinks = () => {
        console.log('Generate the shared links');
        onShareAccessChange();
    };

    const { shared_link: sharedLink }: BoxItem = item;
    const boxUrl = sharedLink ? sharedLink.url : intl.formatMessage(messages.shareDialogNone);
    const rnsUrl = sharedLink
        ? sharedLink.vanity_url ? sharedLink.vanity_url : intl.formatMessage(messages.shareDialogNone)
        : intl.formatMessage(messages.shareDialogNone);

    const linksText = `Resilient Link: ${  rnsUrl  }\nBox Link: ${  boxUrl}`;

    /* eslint-disable jsx-a11y/label-has-for */
    return (
        <Modal
            isOpen={isOpen}
            parentSelector={() => parentElement}
            portalClassName={`${CLASS_MODAL} be-modal-share`}
            className={CLASS_MODAL_CONTENT}
            overlayClassName={CLASS_MODAL_OVERLAY}
            onRequestClose={onCancel}
            contentLabel={intl.formatMessage(messages.shareDialogLabel)}
            appElement={appElement}
        >
            <div className='be-modal-content'>
                <label style={{ width: '100%' }}>
                    <FormattedMessage tagName='div' {...messages.shareDialogText} />
                    <span>
                        <textarea
                            onChange={noop}
                            ref={(input) => {
                                textInput = input;
                            }}
                            rows='2'
                            readOnly={true}
                            style={{ height: 60, width: 300 }}
                            value={linksText}
                        />
                        <PrimaryButton type='button' className='be-modal-button-copy' onClick={copy} autoFocus>
                            <FormattedMessage {...messages.copy} />
                        </PrimaryButton>
                    </span>
                </label>
                <div style={{ fontWeight: 'bold', marginBottom: '10' }}>
                    {intl.formatMessage(messages.emailSharedLink)}
                </div>
                <ShareCollaborators rootId={rootId} onChangeCollabs={onChangeCollabs} onFocusCollabs={onFocusCollabs} />
                <label id='sharedLinkMsg' style={{ width: '100%', display: 'none' }}>
                    <FormattedMessage tagName='div' {...messages.messageSharedLink} />
                    <textarea
                        placeholder={intl.formatMessage(messages.messageSharedLinkPlaceholder)}
                        onChange={noop}
                        ref={(input) => {
                            messageInput = input;
                        }}
                        style={{ height: 60 }}
                    />
                </label>
            </div>
            <div className='be-modal-btns pull-right'>
                <PrimaryButton type='button' onClick={sendEmail} isLoading={isLoading}>
                    <FormattedMessage {...messages.sendEmail} />
                </PrimaryButton>
                <Button type='button' onClick={onCancel} isDisabled={isLoading}>
                    <FormattedMessage {...messages.cancel} />
                </Button>
            </div>
        </Modal>
    );
};

export default injectIntl(ShareDialog);
