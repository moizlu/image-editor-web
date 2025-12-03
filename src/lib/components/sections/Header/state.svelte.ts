let canDragOverValue = $state(true);

export const canDragOver = () => {
    return canDragOverValue;
};

export const setCanDragOver = (value: boolean) => {
    canDragOverValue = value;
};
