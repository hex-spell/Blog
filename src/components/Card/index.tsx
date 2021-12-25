import React from 'react'
import styled from 'styled-components'

const CardBody = styled.div`
    box-shadow: 0 0 0 10px black;
    border: 5px dashed white;
    padding: 10px;
    background-color: black;
`

export const Card: React.FC = ({children}) => {
    return (
        <CardBody>
            {children}
        </CardBody>
    )
}
