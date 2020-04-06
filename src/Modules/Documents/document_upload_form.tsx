import React from "react";
import { DocumentStore } from "./store";
import { inject, observer } from "mobx-react";
import styled from 'styled-components';

interface IDocumentFormProps {
    documentStore? : DocumentStore;
}

const FormWrapper = styled.form`
    display:flex;
    flex-direction: row;
`;

const FieldWrapper = styled.div`
    padding: 5px;
    margin-right: 10px;
    position:relative
`;

const FieldInput = styled.input`
    padding: 5px;
    line-height: 24px;
    font-size: 1em;
    font-family: Roboto;
    margin-right: 5px;
`;

const FieldTextInput = styled(FieldInput)`
    padding: 6px;
`;

const Label = styled.label`
    font-size: 0.8em;
    font-weight: bold;
    font-family: Roboto;
    margin-right: 5px
`;

const ErrorWrapper = styled.span`
    font-size: 0.8em;
    color: red;
    position: absolute;
    widht: 100%;
    align: right;
    padding-top: 5px;
    padding-left: 5px
`;

@inject("documentStore")
@observer
export class DocumentUploadForm extends React.Component<IDocumentFormProps>{
    
    render () {
        const { documentStore } = this.props;
        const {category, file, lastReviewed} = documentStore.newDocumentFormState.$;
        return (
            <div>
                {/* 
                    This is a standard form the uses JSX properties for handeling onChange / onSubmit 
                    events within the form. The values are assigned to input FormState fields in 
                    the document store.

                    The ErrorWrapper is a styled span element that shows the error when the formstate
                    validation is called on submit.
                */}
                <h3>Add New Document</h3>
                <FormWrapper onSubmit={(e) => documentStore.handleFormSubmit(e)}>
                    
                    <FieldWrapper>
                        <Label>Category: <ErrorWrapper>{category.error}</ErrorWrapper></Label>
                        <FieldTextInput
                            type="text"
                            value={category.value}
                            onChange={(e) => category.onChange(e.target.value)} />
                    </FieldWrapper>

                    <FieldWrapper>
                        <Label>Last reviewed: <ErrorWrapper>{lastReviewed.error}</ErrorWrapper></Label>
                        <FieldInput 
                            type="date"
                            onChange={(e) => lastReviewed.onChange(e.target.value)} />
                    </FieldWrapper>

                    <FieldWrapper>
                        <Label>Select file: <ErrorWrapper>{file.error}</ErrorWrapper></Label>
                        <FieldInput 
                            type="file"
                            onChange={(e) => documentStore.handleFileSelect(e)} />
                    </FieldWrapper>
                    
                    <button type="submit">Upload document</button>
                </FormWrapper>
                <hr/>
            </div>
        )
    }
}