import {
  archiveOutline,
  archiveSharp,
  checkboxOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from 'ionicons/icons';
import Page from './pages/Pages/Page';
import { TodoList } from './pages/TodoList/TodoList';

type AppPage = {
  id: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  component: React.FC;
};

export const appPages: AppPage[] = [
  {
    id: 'page-todolist',
    title: 'Todo List',
    url: '/page/TodoList',
    iosIcon: checkboxOutline,
    mdIcon: checkboxOutline,
    component: TodoList,
  },
];
