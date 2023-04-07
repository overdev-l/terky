type Initial = {
    delay: number;
    rootPath?: string;
    request?: () => Promise<string>;
    key: string;
};
declare function useNotification(params: Initial): void;

export { Initial, useNotification };
