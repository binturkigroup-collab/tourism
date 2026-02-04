import React, {PropsWithChildren} from "react";
import {useDrag, useDrop} from "react-dnd";
import {TableRow} from "@mui/material";
import {TableRowProps} from "@mui/material/TableRow";


interface ReorderableRowProps extends TableRowProps{
    index: number;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const ReorderableRow: React.FC<PropsWithChildren<ReorderableRowProps>> = ({ index, moveRow, children }) => {
        const [isDragging, setIsDragging] = React.useState(false);

        const handleMouseDown = () => {
            setIsDragging(true);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleRef = (node: HTMLTableRowElement | null) => {
            if (node) {
                ref(drop(node));
            }
        };

        const [, ref] = useDrag({
            type: 'ROW',
            item: { index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            canDrag: (monitor) => !monitor.isDragging(), // Disable dragging when already dragging
        });

        const [, drop] = useDrop({
            accept: 'ROW',
            hover: (draggedItem: {index: number}) => {
                const hoverIndex = index;

                if (draggedItem.index !== hoverIndex && !isDragging) {
                    moveRow(draggedItem.index, hoverIndex);
                    draggedItem.index = hoverIndex;
                    console.log('is dragging: ', isDragging);
                    // setIsDragging(true);
                }
            },
        });

        return (
            <TableRow
                ref={handleRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                {children}
            </TableRow>
        );
};

export default ReorderableRow;
