export type Category = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    url: string;
    isActive?: boolean;
    description?: string | null;
  };
};

export type CategoryEdited = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    url: string;
    isActive: boolean;
    description?: string | null;
  };
};
