export interface Credentials {
  email: string;
  password: string;
}

export interface CustomToken {
  id: number;
}

export interface ModalData {
  data: any;
  isVisible: boolean;
  type: string;
}

export interface MenuItem {
  iconName: string;
  id: number;
  link: string | null;
  name: string;
}
