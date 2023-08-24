import React from 'react'
import Cell, {CellColor} from "./cell";
import {render, screen} from "@testing-library/react";

test('render empty cell', () => {
    render(
        <Cell color={CellColor.NONE} onClick={() => undefined}/>
    )
    const elem = screen.getByTestId('cell')
    expect(elem).toBeInTheDocument()
    expect(elem).toHaveStyle({
        backgroundColor: CellColor.NONE
    })
})

test.each([
    ['player 1', CellColor.P1], ['player 2', CellColor.P2]])('render %s', (_: string, cell: CellColor) => {
    render(
        <Cell color={cell} onClick={() => undefined}/>
    )
    const elem = screen.getByTestId('cell')
    expect(elem).toBeInTheDocument()
    expect(elem).toHaveStyle({
        backgroundColor: cell
    })
})