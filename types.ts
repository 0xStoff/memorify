export type RootStackParamList = {
  Home: undefined;
  Event: { event: Event };
};

export interface Event {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  memories: Memory[];
}

export interface Memory {
  id: string;
  imageUrl: string;
  description: string;
  userName: string;
}
