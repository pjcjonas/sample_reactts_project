import React from "react";
import { observer } from "mobx-react";
import styled from 'styled-components';

const SpacerDiv = styled.div`
    width: 100%;
    display: inline-table;
    margin-bottom: 10px;
`;

export const Spacer = observer<React.SFC>(() => (
    <SpacerDiv />
));