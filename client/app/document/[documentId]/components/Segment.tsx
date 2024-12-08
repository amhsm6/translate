import React, { useEffect, useRef, useState } from "react";
import type { Segment } from "../context";
import { updateTarget } from "../actions";
import { Button } from "@/components/ui/button";
import { HashLoader } from "react-spinners";

type Props = {
    segment: Segment
};

export default function Segment({ segment }: Props) {
    const [targetText, setTargetText] = useState('');
    const [saving, setSaving] = useState(false);

    const ref = useRef<HTMLTextAreaElement>(null);

    // FIXME: a bit awkward but warks
    useEffect(() => {
        if (!ref.current) { return; }

        const cols = ref.current.cols + 1;
        const rows = targetText.split(/\r\n|\r|\n/)
            .map(line => 1 + Math.floor(line.length / cols))
            .reduce((x, y) => x + y, 0);

        ref.current.rows = rows;
    }, [targetText]);

    const save = () => {
        setSaving(true);

        // TODO: execute a server action
        updateTarget(segment.target?.id, targetText);

        setTimeout(() => setSaving(false), 1000);
    };

    return (
        <div className="p-3 border-b-2 border-b-gray-300 flex">
            <div
                className="w-1/3 min-h-20 mr-24 break-words border-2"
            >
                { segment.source }
            </div>

            <textarea
                ref={ ref }
                className="min-h-20 border-2 resize-none"
                cols={ 30 }
                value={ targetText }
                onChange={ e => setTargetText(e.target.value) }
                disabled={ saving }
            />

            <div className="w-auto flex-grow flex justify-center items-center">
                <div className="w-5/12 flex justify-between items-center">
                    <Button onClick={ save } disabled={ saving }>Save</Button>
                    { saving && <HashLoader size={ 20 } /> }
                </div>
            </div>
        </div>
    );
}
