"use client";

import React, { createContext, useReducer } from "react";
import type { Task } from "@/types";

type State = {
    task: Task,
    currentSegmentId: string | null
};

type Action = { type: "select", id: string }
            | { type: "select-next", index: number }
            | { type: "deselect" };

const reducer: React.Reducer<State, Action> = (state, action) => {
    switch (action.type) {
    case "select":
        return {
            ...state,
            currentSegmentId: action.id
        };

    case "select-next":
        const newIndex = action.index < state.task.document.segments.length ? action.index + 1 : action.index;
        return {
            ...state,
            currentSegmentId: state.task.document.segments[newIndex - 1].id
        };

    case "deselect":
        return {
            ...state,
            currentSegmentId: null
        };
    }
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
