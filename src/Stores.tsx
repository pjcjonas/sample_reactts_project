import { DocumentStore } from "./Modules/Documents/store";

export function initStores () {
    // eslint-disable-next-line
    const stores = {
        documentStore: new DocumentStore()
    }

    return stores;
}