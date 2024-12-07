"use client";

import React, { createContext, useReducer } from "react";

export type Document = {
    id: string,
    title: string,
    segments: Segment[]
};

export type Segment = {
    id: string,
    source: string,
    target: {
        id: string,
        text: string
    }
};

type State = {
    segments: Segment[],
    currentSegmentId: string | null
};

const initial: State = {
    segments: [],
    currentSegmentId: null
};

type Action = { type: 'add' };

const reducer: React.Reducer<State, Action> = (state, action) => {
    return state;
};

export default reducer;

export const context = createContext<{ state: State, disptach: React.ActionDispatch<[Action]> }>({ state: initial, disptach: () => {} });

export function ContextProvider({ children }: React.PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, initial);

    return (
        <context.Provider value={ { state, dispatch } }>
            { children }
        </context.Provider>
    );
}
