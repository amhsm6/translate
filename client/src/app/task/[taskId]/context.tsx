"use client";

import React, { createContext, useReducer } from "react";
import type { Task } from "@/types";

type State = {
    task: Task,
    currentSegmentId: string | null
};

type Action = { type: "add" };

const reducer: React.Reducer<State, Action> = (state, action) => {
    return state;
};

type Context = {
    state: State,
    dispatch: React.ActionDispatch<[Action]>
} | null;

const context = createContext<Context>(null);

export default context;

type Props = { task: Task } & React.PropsWithChildren;

export function ContextProvider({ task, children }: Props) {
    const [state, dispatch] = useReducer(reducer, { task, currentSegmentId: null });

    return (
        <context.Provider value={{ state, dispatch }}>
            { children }
        </context.Provider>
    );
}
