import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import {
  addCircleOutline,
  removeCircleOutline,
  trashOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';
import { Todo } from '../../types/todo.type';
import {
  addNewTodo,
  getTodoListDatas,
  removeTodo,
  updateTodoList,
} from './TodoList.logic';

export const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useState<{
    todo: Todo[];
    completed: Todo[];
  }>({
    todo: [],
    completed: [],
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [canRemove, setCanRemove] = useState<boolean>(false);

  useIonViewDidEnter(() => {
    getTodoListDatas().then((newTodoList) => {
      setTodoList(newTodoList);
    });
  });

  const handleOnChangeTodo = (event: CustomEvent, todo: Todo) => {
    const newTodo = todo;
    newTodo.done = event.detail.checked;
    updateTodoList(todoList, newTodo).then((updatedTodoList) => {
      setTodoList({ ...updatedTodoList });
    });
  };

  const handleOnDidDismissAlert = () => {
    setIsOpen(false);
  };

  const handleOnSubmitAlert = (value: { name: string }) => {
    addNewTodo(todoList, value.name).then((updatedTodoList) => {
      setTodoList({ ...updatedTodoList });
      setIsOpen(false);
    });
  };

  const handleOnClickRemoveTodo = (todo: Todo) => {
    removeTodo(todoList, todo).then((updatedTodoList) => {
      setTodoList({ ...updatedTodoList });
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>
            <IonLabel>Todo List</IonLabel>
            <IonButtons>
              <IonButton
                color="primary"
                fill="outline"
                onClick={() => setIsOpen(true)}
              >
                <IonLabel>Add New</IonLabel>
                <IonIcon slot="end" icon={addCircleOutline} />
              </IonButton>
              <IonButton
                color="danger"
                fill="solid"
                onClick={() => setCanRemove(!canRemove)}
              >
                <IonLabel>{canRemove ? 'Hide' : 'Remove'}</IonLabel>
                <IonIcon slot="end" icon={removeCircleOutline} />
              </IonButton>
            </IonButtons>
          </IonListHeader>
          <IonItemDivider />
          <IonListHeader>
            <IonLabel>My Task</IonLabel>
          </IonListHeader>
          {todoList.todo.map((todo) => {
            return (
              <IonItem key={`todo-${todo.id}`}>
                <IonCheckbox
                  slot="start"
                  checked={todo.done}
                  onIonChange={(e) => handleOnChangeTodo(e, todo)}
                />
                <IonLabel>{todo.name}</IonLabel>
                {canRemove && (
                  <IonButton
                    slot="end"
                    color="danger"
                    fill="outline"
                    onClick={() => handleOnClickRemoveTodo(todo)}
                  >
                    <IonIcon
                      slot="icon-only"
                      icon={trashOutline}
                      color="danger"
                    />
                  </IonButton>
                )}
              </IonItem>
            );
          })}
          <IonItemDivider />
          <IonListHeader>
            <IonLabel>Completed</IonLabel>
          </IonListHeader>
          {todoList.completed.map((todo) => {
            return (
              <IonItem key={`complete-${todo.id}`}>
                <IonCheckbox
                  slot="start"
                  checked={todo.done}
                  onIonChange={(e) => handleOnChangeTodo(e, todo)}
                />
                <IonLabel>{todo.name}</IonLabel>
                {canRemove && (
                  <IonButton
                    slot="end"
                    color="danger"
                    fill="outline"
                    onClick={() => handleOnClickRemoveTodo(todo)}
                  >
                    <IonIcon
                      slot="icon-only"
                      icon={trashOutline}
                      color="danger"
                    />
                  </IonButton>
                )}
              </IonItem>
            );
          })}
        </IonList>

        <IonAlert
          isOpen={isOpen}
          backdropDismiss={false}
          header="New Todo"
          inputs={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Task XXX',
            },
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: handleOnDidDismissAlert,
            },
            {
              text: 'Save',
              handler: handleOnSubmitAlert,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};
