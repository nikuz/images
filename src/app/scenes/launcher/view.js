// @flow

import * as React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
// locales
// $FlowFixMe
import enLocale from 'react-intl/locale-data/en';
// $FlowFixMe
import ruLocale from 'react-intl/locale-data/ru';
//
import { Loading } from '../../components';
import type {
    Translation,
    ErrorObject,
    User,
} from '../../types';

import './style.css';

const locales = {
    en: enLocale,
    ru: ruLocale,
};

type Props = {
    children: React.Node,
    languageDictionaries: Translation[],
    languageError?: ErrorObject,
    curLanguage: string,
    profileToken?: string,
    profileGetUserLoading: boolean,
    profileGetUserError: ?ErrorObject,
    user?: User, // eslint-disable-line
    getTranslations: () => *,
    getProfileToken: () => *,
    getUser: (token: string) => *,
    clearToken: () => *,
};

export default class Launcher extends React.PureComponent<Props> {
    componentWillMount(): void {
        this.props.getTranslations();
        this.props.getProfileToken();
    }

    componentWillReceiveProps(newProps: Props) {
        if (newProps.profileToken && !this.props.profileToken && !newProps.user) {
            this.props.getUser(newProps.profileToken);
        }
        if (newProps.profileGetUserError && !this.props.profileGetUserError) {
            this.props.clearToken();
        }
        // this.checkLanguage(newProps);
    }

    getDictionary = () => {
        const {
            languageDictionaries,
            curLanguage,
        } = this.props;

        const curLanguageObject = languageDictionaries.find(item => (
            item.name === curLanguage
        ));

        return curLanguageObject ? curLanguageObject.dictionary : {};
    };

    changeLanguage(language: string) {
        addLocaleData(locales[language]);
        // this.getLanguageRequest = this.props.getTranslation(language);
        // this.getLanguageRequest.then(() => {
        //     this.getLanguageRequest = undefined;
        // });
    }

    // checkLanguage = (props: Props) => {
    //     const {
    //         languageDictionary,
    //         curLanguage,
    //     } = props;
    //
    //     if (
    //         (!languageDictionary || curLanguage !== this.props.curLanguage)
    //         && !this.getLanguageRequest
    //     ) {
    //         this.changeLanguage(curLanguage);
    //     }
    // };

    render() {
        const {
            languageDictionaries,
            curLanguage,
            profileGetUserLoading,
            languageError,
        } = this.props;

        return (
            <IntlProvider
                key={curLanguage}
                locale={curLanguage}
                messages={this.getDictionary()}
            >
                <div id="launcher">
                    { languageError && (
                        <div>
                            Api is under maintenance. Please try again later.
                        </div>
                    ) }
                    { (!!languageDictionaries.length && !profileGetUserLoading)
                        ? this.props.children
                        : !languageError && (
                            <div id="launcher-loading">
                                <Loading size="big" />
                                <div id="launcher-loading-text">
                                    Just hidden text. It needed to preload fonts
                                    <span className="thin">Thin</span>
                                    <span className="bold">Bold</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </IntlProvider>
        );
    }
}
