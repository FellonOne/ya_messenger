import { ComponentList } from './Framework/types';
import { Button } from './Components/UI/Button/Button';
import { ComponentClass } from './Framework/Router/Route';
import { BaseInput } from './Components/UI/BaseInput/BaseInput';
import { BaseTextarea } from './Components/UI/BaseTextarea/BaseTextarea';
import { Menu } from './Components/Menu/Menu';
import { ItemList } from './Components/Menu/ItemList/ItemList';
import { ContactSearch } from './Components/Messenger/ContactSearch';
import { ContactsList } from './Components/Messenger/ContactsList';
import { Conversation } from './Components/Messenger/Conversation/Conversation';
import { LoginForm } from './Components/LoginForm';
import { RegisterForm } from './Components/RegisterForm';
import { SettingsForm } from './Components/SettingsForm';
import { RouterComponent } from './Components/RouterComponent';
import { ChangeAvatarForm } from './Components/ChangeAvatarForm';
import { Spinner } from './Components/UI/Spinner/Spinner';

export const componentList: ComponentList[] = [
  {
    name: 'Button',
    value: (Button as unknown) as ComponentClass,
  },
  {
    name: 'BaseInput',
    value: (BaseInput as unknown) as ComponentClass,
  },
  {
    name: 'BaseTextarea',
    value: (BaseTextarea as unknown) as ComponentClass,
  },
  {
    name: 'Menu',
    value: (Menu as unknown) as ComponentClass,
  },
  {
    name: 'ItemList',
    value: (ItemList as unknown) as ComponentClass,
  },
  {
    name: 'ContactSearch',
    value: (ContactSearch as unknown) as ComponentClass,
  },
  {
    name: 'ContactsList',
    value: (ContactsList as unknown) as ComponentClass,
  },
  {
    name: 'Conversation',
    value: (Conversation as unknown) as ComponentClass,
  },
  {
    name: 'LoginForm',
    value: (LoginForm as unknown) as ComponentClass,
  },
  {
    name: 'RegisterForm',
    value: (RegisterForm as unknown) as ComponentClass,
  },
  {
    name: 'SettingsForm',
    value: (SettingsForm as unknown) as ComponentClass,
  },
  {
    name: 'RouterComponent',
    value: (RouterComponent as unknown) as ComponentClass,
  },
  {
    name: 'ChangeAvatarForm',
    value: (ChangeAvatarForm as unknown) as ComponentClass,
  },
  {
    name: 'Spinner',
    value: (Spinner as unknown) as ComponentClass,
  },
];
