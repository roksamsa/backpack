export type Category = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    url: string;
    description?: string | null;
  };
};
