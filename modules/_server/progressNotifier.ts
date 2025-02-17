import { TextDocument } from 'vscode-languageserver-textdocument';

import { OnSpellCheckDocumentStep } from './api';
import { ClientApi } from './clientApi';

let seq = 0;

export interface ProgressNotifier {
    emitSpellCheckDocumentStep: (doc: TextDocument, step: string, numIssues?: number) => void;
}

export function createProgressNotifier(clientApi: ClientApi): ProgressNotifier {
    return {
        emitSpellCheckDocumentStep: (doc, step, numIssues) =>
            clientApi.sendOnSpellCheckDocument(toOnSpellCheckDocumentStep(doc, step, numIssues)),
    };
}

function toOnSpellCheckDocumentStep(doc: TextDocument, step: string, numIssues: number | undefined): OnSpellCheckDocumentStep {
    return {
        uri: doc.uri,
        version: doc.version,
        step,
        seq: ++seq,
        ts: Date.now(),
        numIssues,
        done: numIssues !== undefined,
    };
}
