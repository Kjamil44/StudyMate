export interface FetchResponse<T> extends Omit<Response, 'json'> {
  data: T;
}

export interface LoginResponse {
  userId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const StatusEnumObject = {
  TODO: 0,
  DOING: 1,
  DONE: 2,
} as const;

export type StatusEnum = (typeof StatusEnumObject)[keyof typeof StatusEnumObject];

export const PriorityLevelObject = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
} as const;

export type PriorityLevel = (typeof PriorityLevelObject)[keyof typeof PriorityLevelObject];

export interface GetAllNotesItemResponse {
  id: string;
  title: string;
  description: string;
  belongsId: string;
  belongsName: string;
}

export type GetAllNotesResponse = {
  items: GetAllNotesItemResponse[];
};

export interface GetNoteReponse {
  id: string;
  title: string;
  description: string;
  belongsId: string;
  belongsName: string;
}

export interface CreateNoteResponse {}

export interface UpdateNoteResponse {}

export interface DeleteNoteResponse {}

export interface GetAllSubjectsItemResponse {
  id: string;
  userId: string;
  name: string;
  description: string;
  grade: number;
  startDate: Date;
  endDate: Date;
  status: StatusEnum;
}

export type GetAllSubjectsResponse = {
  items: GetAllSubjectsItemResponse[];
};

export interface GetSubjectReponse {
  id: string;
  userId: string;
  name: string;
  description: string;
  grade: number;
  startDate: Date;
  endDate: Date;
  status: StatusEnum;
}

export interface CreateSubjectResponse {}

export interface UpdateSubjectResponse {}

export interface DeleteSubjectResponse {}

export interface GetAllTasksItemResponse {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  dateCreated: Date;
  dueDate: Date;
  priorityLevel: PriorityLevel;
  status: StatusEnum;
}

export type GetAllTasksResponse = {
  items: GetAllTasksItemResponse[];
};

export interface GetTaskReponse {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  dateCreated: Date;
  dueDate: Date;
  priorityLevel: PriorityLevel;
  status: StatusEnum;
}

export interface CreateTaskResponse {}

export interface UpdateTaskResponse {}

export interface DeleteTaskResponse {}

export interface GetAllUsersItemResponse {
  userId: string;
  name: string;
  surname: string;
  email: string;
}

export type GetAllUsersResponse = {
  items: GetAllUsersItemResponse[];
};

export interface GetUserReponse {
  userId: string;
  name: string;
  surname: string;
  email: string;
}

export interface CreateUserResponse {
  userId: string;
}

export interface UpdateUserResponse {}

export interface DeleteUserResponse {}

export interface CreateNoteRequest {
  title: string;
  description: string;
  belongsId: string;
  belongsName: string;
}

export interface UpdateNoteRequest {
  id: string;
  title: string;
  description: string;
}

export interface CreateSubjectRequest {
  userId: string;
  name: string;
  description: string;
  grade: number;
  startDate: string;
  endDate: string;
  status: StatusEnum;
}

export interface UpdateSubjectRequest {
  id: string;
  name: string;
  description: string;
  grade: number;
  startDate: string;
  endDate: string;
  status: StatusEnum;
}

export interface CreateTaskRequest {
  subjectId: string;
  title: string;
  description: string;
  dueDate: string;
  priorityLevel: PriorityLevel;
  status: StatusEnum;
}

export interface UpdateTaskRequest {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: string;
  priorityLevel: PriorityLevel;
  status: StatusEnum;
}

export interface CreateUserRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  userId: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}
