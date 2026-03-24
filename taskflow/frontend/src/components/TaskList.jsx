import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable,
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

// Carte de tâche réutilisable pour l'affichage normal et le DragOverlay
function TaskCard({ task, onDelete, isOverlay = false, attributes = {}, listeners = {} }) {
    return (
        <div
            className={`taskpilot-card ${isOverlay ? "taskpilot-overlay-card" : ""}`}
            {...attributes}
            {...listeners}
        >
            <h4>{task.title}</h4>
            <p>{task.description || "Aucune description"}</p>

            {/* Le bouton supprimer n’apparaît pas dans l’overlay */}
            {!isOverlay && (
                <button
                    className="delete-btn"
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.id);
                    }}
                >
                    Supprimer
                </button>
            )}
        </div>
    );
}

// Carte triable avec dnd-kit
function SortableTaskCard({ task, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id.toString(),
        data: {
            type: "task",
            task,
        },
    });

    // Style calculé automatiquement pendant le déplacement
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.25 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <TaskCard
                task={task}
                onDelete={onDelete}
                attributes={attributes}
                listeners={listeners}
            />
        </div>
    );
}

// Colonne du tableau Kanban
function TaskColumn({ title, columnId, tasks, onDelete }) {
    const { setNodeRef, isOver } = useDroppable({
        id: columnId,
        data: {
            type: "column",
            status: columnId,
        },
    });

    return (
        <div className="taskpilot-column">
            <div className="taskpilot-column-header">
                <h3>{title}</h3>
                <span className="column-count">{tasks.length}</span>
            </div>

            {/* Zone de dépôt de la colonne */}
            <div
                ref={setNodeRef}
                className={`taskpilot-dropzone ${isOver ? "drag-over" : ""}`}
            >
                <SortableContext
                    items={tasks.map((task) => task.id.toString())}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.length === 0 && (
                        <div className="taskpilot-empty">Aucune tâche</div>
                    )}

                    {tasks.map((task) => (
                        <SortableTaskCard
                            key={task.id}
                            task={task}
                            onDelete={onDelete}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

// Composant principal du board
function TaskList({ tasks, onDelete, onDragEnd }) {
    // Tâche active utilisée pour l’overlay pendant le déplacement
    const [activeTask, setActiveTask] = useState(null);

    // Déclenchement du drag dès que la souris bouge un peu
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 2,
            },
        })
    );

    // Répartition des tâches par statut
    const columns = {
        todo: {
            title: "À faire",
            items: tasks.filter((task) => task.status === "todo"),
        },
        in_progress: {
            title: "En cours",
            items: tasks.filter((task) => task.status === "in_progress"),
        },
        done: {
            title: "Terminée",
            items: tasks.filter((task) => task.status === "done"),
        },
    };

    // Stocke la tâche active au début du drag
    const handleDragStart = (event) => {
        const taskId = parseInt(event.active.id, 10);
        const task = tasks.find((t) => t.id === taskId);
        setActiveTask(task || null);
    };

    // Réinitialise l’overlay puis appelle la logique du parent
    const handleDragEnd = async (event) => {
        setActiveTask(null);
        await onDragEnd(event);
    };

    // Annule proprement l’overlay si le drag est interrompu
    const handleDragCancel = () => {
        setActiveTask(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <div className="taskpilot-board">
                <TaskColumn
                    title={columns.todo.title}
                    columnId="todo"
                    tasks={columns.todo.items}
                    onDelete={onDelete}
                />
                <TaskColumn
                    title={columns.in_progress.title}
                    columnId="in_progress"
                    tasks={columns.in_progress.items}
                    onDelete={onDelete}
                />
                <TaskColumn
                    title={columns.done.title}
                    columnId="done"
                    tasks={columns.done.items}
                    onDelete={onDelete}
                />
            </div>

            {/* Carte flottante affichée sous la souris pendant le drag */}
            <DragOverlay>
                {activeTask ? (
                    <TaskCard task={activeTask} onDelete={onDelete} isOverlay />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

export default TaskList;