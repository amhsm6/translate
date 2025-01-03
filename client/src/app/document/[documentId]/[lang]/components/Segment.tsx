import React, { useState, useEffect, useContext, useRef } from "react";
import { updateTarget } from "../actions";
import context, { Segment as DocumentSegment, Translation } from "../context";
import { Button } from "@/components/ui/button";
import { HashLoader } from "react-spinners";

type Props = {
    segment: DocumentSegment
};

export default function Segment({ segment }: Props) {
    if (segment.translations.length > 1) {
        throw new Error("It is possible to edit translation for only one language at a time");
    }
    const [translation, setTranslation] = useState<Translation | null>(segment.translations.length == 0 ? null : segment.translations[0]);
    const [targetText, setTargetText] = useState(translation?.target || "");

    const { state } = useContext(context);
    const translationLang = state?.translationLang;
    if (!translationLang) {
        throw new Error("Translation Language is undefined");
    }

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    if (error) { throw error; }

    const ref = useRef<HTMLTextAreaElement>(null);

    // FIXME: a bit awkward but works
    useEffect(() => {
        if (!ref.current) { return; }

        if (translation) { translation.target = targetText; }

        const cols = ref.current.cols + 1;
        const rows = targetText.split(/\r\n|\r|\n/)
            .map(line => 1 + Math.floor(line.length / cols))
            .reduce((x, y) => x + y, 0);

        ref.current.rows = rows;
    }, [targetText]);

    const save = () => {
        setSaving(true);

        updateTarget(segment.id, translationLang, translation?.id || null, targetText)
            .then(trans => {
                setTranslation(trans);
                setSaving(false);
            })
            .catch(e => setError(e));
    };

    return (
        <div className="w-full ml-5 py-3 border-b-2 border-b-gray-300 flex justify-center">
            <div className="w-11/12 flex">
                <div className="w-1/3 min-h-20 mr-24 break-words border-2" style={{ userSelect: "none" }}>
                    { segment.source }
                </div>

                <textarea
                    ref={ ref }
                    className="w-1/3 min-h-20 border-2 resize-none"
                    cols={ 30 }
                    value={ targetText }
                    onChange={ e => setTargetText(e.target.value) }
                    disabled={ saving }
                />

                <div className="w-2/12 ml-5 flex justify-center items-center">
                    <div className="w-8/12 flex justify-between items-center">
                        <Button onClick={ save } disabled={ saving || !targetText }>Save</Button>
                        { saving && <HashLoader size={ 20 } /> }
                    </div>
                </div>
            </div>
        </div>
    );
}
