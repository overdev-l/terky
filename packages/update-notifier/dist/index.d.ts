interface FecthInit {
    mehtod?: 'get' | 'post';
    headers?: Headers;
    body?: any;
    mode?: any;
    credentials?: any;
    cache?: any;
    redirect?: any;
    referrer?: any;
    referrerPolicy?: any;
    integrity?: any;
}
interface Initial {
    delay: number;
    url?: string;
    init?: FecthInit;
    key: string;
}
declare function useNotification(params: Initial): void;

export { useNotification };
