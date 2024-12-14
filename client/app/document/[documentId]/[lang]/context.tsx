"use client";

import React, { createContext, useReducer } from "react";

export type Document = {
    id: string,
    title: string,
    segments: Segment[]
};

export type Segment = {
    id: string,
    index: number,
    source: string,
    lang: string,
    translations: Translation[]
};

export type Translation = {
    id: string,
    target: string,
    lang: string
};

type State = {
    document: Document,
    currentSegmentId: string | null
} | null;

type Action = { type: 'add' };

const reducer: React.Reducer<State, Action> = (state, action) => {
    return state;
};

const context = createContext<{ state: State, dispatch: React.ActionDispatch<[Action]> }>({ state: null, dispatch: () => {} });

export default context;

type Props = {
    document: Document
} & React.PropsWithChildren;

export function ContextProvider({ document, children }: Props) {
    const [state, dispatch] = useReducer(reducer, { document, currentSegmentId: null });

    return (
        <context.Provider value={ { state, dispatch } }>
            { children }
        </context.Provider>
    );
}
