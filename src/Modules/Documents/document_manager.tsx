import React from "react";
import { DocumentStore } from "./store";
import { inject, observer } from "mobx-react";
import { HeaderBar } from "../Components/HeaderBar";
import { Spacer } from "../Components/Spacer";
import styled from 'styled-components';
import { DocumentList } from './document_list';
import loader from '../../Assets/loader.svg';
import { DocumentUploadForm } from './document_upload_form';

interface IDocumentProps {
    documentStore? : DocumentStore;
}

const ModuleWrapper = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 1024px;
`;

/**
 * Documents Base Application Component
 * 
 * We inject the document store into the React Component.
 */
@inject("documentStore")
@observer
export class DocumentApp extends React.Component<IDocumentProps>{

    /**
     * Initailiza the component by calling the init fuction, this will 
     * trigger the component default state as well as do the inital 
     * call to the documents API.
     */
    componentDidMount() {
        this.props.documentStore.init();
    }

    render () {
        const {documentStore} = this.props;
        return (
            /**
             * Using styled components we declare the ModuleWrapper 
             * as a styled component div.
             */
            <ModuleWrapper>
                {/* 
                    Header component for re-use
                 */}
                <HeaderBar header="Welcome to the docs" />
                <Spacer />

                {/* 
                    Document Upload component.
                */}
                <DocumentUploadForm />
                <Spacer />

                {/* 
                    During the defualt state as well as uploading a new document we set 
                    the document list to an empty array, this will initiate this 
                    line to show a preloader SVG animation.
                */}
                {documentStore.documents.length == 0 && <div className="align-content-center"><img src={loader} /></div>}

                {/* 
                    As with the preloader we show the document list that gets only a list 
                    of documents. this will only show if the documents array has and 
                    items in the list.
                */}
                {documentStore.documents.length > 0 && <DocumentList document_list={documentStore.documents}/>}
            </ModuleWrapper>    
        )
    }
}