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
    translationLang: string,
    currentSegmentId: string | null
};

type Action = { type: 'add' };

const reducer: React.Reducer<State, Action> = (state, action) => {
    return state;
};

type Context = {
    state: State,
    dispatch: React.ActionDispatch<[Action]>
} | null;

const context = createContext<Context>(null);

export default context;

type Props = {
    document: Document,
    translationLang: string
} & React.PropsWithChildren;

export function ContextProvider({ document, translationLang, children }: Props) {
    const [state, dispatch] = useReducer(reducer, { document, translationLang, currentSegmentId: null });

    return (
        <context.Provider value={{ state, dispatch }}>
            { children }
        </context.Provider>
    );
}
