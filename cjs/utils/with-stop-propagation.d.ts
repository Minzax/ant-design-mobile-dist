import React, { ReactElement } from 'react';
export declare type PropagationEvent = 'click';
export declare function withStopPropagation(events: PropagationEvent[], element: ReactElement): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
