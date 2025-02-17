import { ConfigurationItem, Connection } from 'vscode-languageserver/node';

import { log } from '../../__utils/log';
import { isDefined } from '../utils';

export interface TextDocumentUri {
    uri: string;
}

export interface TextDocumentUriLangId extends TextDocumentUri {
    languageId: string;
}

export function getConfiguration(connection: Connection, items: ConfigurationItem[]): Promise<any[]> {
    const uris = items.map((p) => p.scopeUri).filter(isDefined);
    log('getConfiguration', uris);
    return connection.workspace.getConfiguration(items);
}

/**
 * Just a pass through function to `connection.workspace.getWorkspaceFolders`
 * Useful for mocking.
 * @param connection
 */

export function getWorkspaceFolders(connection: Connection) {
    return connection.workspace.getWorkspaceFolders();
}
