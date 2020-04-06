import { services } from './services';
import { action, observable } from "mobx";
import { FormState, FieldState } from "formstate";
import { isRequired, isValidDate, minLength } from '../Utils/validators';

export interface IDocument {
    DocumentId: number,
    DocumentFileName: string,
    AzureFileReference: string,
    Category: string,
    LastReviewed: string
}

/**
 * Document Process Store. Handles all the document functionality 
 * for the UI Components.
 */
export class DocumentStore {

    @observable selectedFile: any;
    @observable newDocument = null;
    @observable documents: IDocument[] = [];
    @observable newDocumentFormState = new FormState({
        file: new FieldState("").validators(isRequired, minLength(1)),
        category: new FieldState("").validators(isRequired, minLength(1)),
        lastReviewed: new FieldState("").validators(isRequired, isValidDate)
    });

    /**
     * Get all the documents from the service API
     */
    @action getDocuments = ():void => {
        this.documents = [];
        services.retrieveDocuments().then((response) => {
            this.documents = response;
        }).catch((err) => {
            console.log("CATCH: getDocuments: ", err);
        });
    }

    /**
     * Sprocess the form data on submit.
     * 
     * @param e Form submit event.
     */
    @action async handleFormSubmit(e: any) {
        e.preventDefault();

        const validationState = await this.newDocumentFormState.validate();
        if (validationState.hasError) {
            return;
        }
        
        const formData = new FormData();
        formData.append("file", this.selectedFile, this.newDocumentFormState.$.file.value);
        formData.append("Category", this.newDocumentFormState.$.category.value);
        formData.append("LastReviewed", this.newDocumentFormState.$.lastReviewed.value);
        
        services.uploadDocument(formData).then((response) => {
            if (parseInt(response)) {
                this.getDocuments();
            }
        }).catch((err) => {
            console.log("CATCH: uploadDocument: ", err);
        });
    }

    /**
     * We need to handle the form input for file selection seperately.
     * @param e 
     */
    handleFileSelect(e: any) {
        this.selectedFile = e.target.files[0] || null;
        this.newDocumentFormState.$.file.value = e.target.files[0].name || '';
    }

    /**
     * Extracts the file tupe based on the extension of the selected file.
     * @param fileName 
     */
    fileType(fileName: string):string {
        const splitString = fileName.split('.');
        return splitString[splitString.length-1] || "N/A";
    }

    /**
     * Initializes the store and setting the default properties for the form
     * state and getting the document list.
     */
    async init () {
        this.getDocuments();
        this.newDocumentFormState.$.category.reset();
        this.newDocumentFormState.$.file.reset();
        this.newDocumentFormState.$.lastReviewed.reset();
    }
}