import { ReactElement } from 'react';
export declare type GetContainer = HTMLElement | (() => HTMLElement) | null;
export declare function renderToContainer(getContainer: GetContainer, node: ReactElement): ReactElement<any, string | ((props: any) => ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
