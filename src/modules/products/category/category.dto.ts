export interface CreateCategoryDTO {
    name: string;
    description?: string;
  
    attributes?: {
      key: string;
      label: string;
      type: "text" | "number" | "select";
      required?: boolean;
      options?: string[];
    }[];
  }

  export interface UpdateCategoryDTO {
    name?: string;
    description?: string;
  
    attributes?: {
      key: string;
      label: string;
      type: "text" | "number" | "select";
      required?: boolean;
      options?: string[];
    }[];
  }