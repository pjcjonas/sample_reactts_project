import React from "react";
import { observer } from "mobx-react";
import styled from 'styled-components';

type THeaderBarProps = {
    header: string;
}

const HeaderBarDiv = styled.div`
    width: 100%;
    background-color: #CCCCCC;
    display: flex;
    padding: 20px;
    font-size: 1.2em;
    font-weight: bold;
    text-transform: uppercase;
    font-family: Roboto
`;

export const HeaderBar = observer<React.SFC<THeaderBarProps>>(({header}) => (
    <HeaderBarDiv>{header}</HeaderBarDiv>
));