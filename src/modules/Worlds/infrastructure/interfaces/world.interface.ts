export interface IStage {
    id: string;
    name: string;
    isBlocked: boolean;
    isCompleted: boolean;
    img: string;
    isCurrent: boolean;
    start: string;
    position: string;
    showLabel?: boolean;
}

export interface IWorld {
    id: string;
    name: string;
    isBlocked: boolean;
    isCompleted: boolean;
    img: string;
    isCurrent: boolean;
    universeId: string;
    stages: IStage[];
}