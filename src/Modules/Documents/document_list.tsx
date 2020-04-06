import React from "react";
import { DocumentStore, IDocument } from "./store";
import { inject, observer } from "mobx-react";
import styled from 'styled-components';
import { Constants } from '../../Constants';

interface IDocumentListProps {
    documentStore? : DocumentStore;
    document_list : IDocument[];
}

const ListModuleWrapper = styled.div`
    width: 100%;
    max-width: 1024px;
`;

const ListTable = styled.table`
    width: 100%;
    max-width: 1024px;
`;

@inject("documentStore")
@observer
export class DocumentList extends React.Component<IDocumentListProps>{
    
    render () {
        const { document_list, documentStore } = this.props;
        return (
            <ListModuleWrapper>
                <ListTable>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Document</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Last Reviewed</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* 
                        This is using the observerable document_list to render the documents 
                        that gets returned from the documents api.
                    */}
                    {document_list.map((doc, index)=> (
                        <tr key={"document_" + index}>
                            <td>{doc.DocumentId}</td>
                            <td>{doc.DocumentFileName.substr(0, 25)}...</td>
                            <td>{documentStore.fileType(doc.DocumentFileName)}</td>
                            <td>{doc.Category}</td>
                            <td>{doc.LastReviewed}</td>
                            <td className="align-right">
                                <a href={Constants.DOWNLOAD_DOCUMENT + '/' + doc.DocumentId} target="_blank">
                                    <i className="fas fa-download"></i>
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </ListTable>
                
            </ListModuleWrapper>
        )
    }
}