import React, { useEffect, useRef, useState } from "react";
import type { Segment } from "../context";
import { Button } from "@/components/ui/button";

type Props = {
    segment: Segment
};

export default function Segment({ segment }: Props) {
    const [state, setState] = useState('');
    const ref = useRef<HTMLTextAreaElement>(null);

    // FIXME: a bit awkward but warks
    useEffect(() => {
        if (!ref.current) { return; }

        const cols = ref.current.cols + 1;
        const rows = state.split(/\r\n|\r|\n/)
            .map(line => { console.log(line, line.length, 1 + Math.floor(line.length / cols)); return 1 + Math.floor(line.length / cols); })
            .reduce((x, y) => x + y, 0);

        ref.current.rows = rows;
    }, [state]);

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
                value={ state }
                onChange={ e => setState(e.target.value) }
            />

            <Button>
                123
            </Button>
        </div>
    );
}
