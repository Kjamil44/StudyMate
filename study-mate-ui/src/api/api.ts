import { api, createFetchResponse } from './configuration';
import {
  FetchResponse,
  CreateNoteRequest,
  CreateNoteResponse,
  CreateSubjectRequest,
  CreateSubjectResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  CreateUserRequest,
  CreateUserResponse,
  DeleteNoteResponse,
  DeleteSubjectResponse,
  DeleteTaskResponse,
  DeleteUserResponse,
  GetAllNotesResponse,
  GetAllSubjectsResponse,
  GetAllTasksResponse,
  GetAllUsersResponse,
  GetNoteReponse,
  GetSubjectReponse,
  GetTaskReponse,
  GetUserReponse,
  LoginRequest,
  LoginResponse,
  UpdateNoteRequest,
  UpdateNoteResponse,
  UpdateSubjectRequest,
  UpdateSubjectResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from './types';

const accountUrl = '/account';
const LOGIN = `${accountUrl}/login`;

const login = (body: LoginRequest): Promise<FetchResponse<LoginResponse>> => {
  return api.post(LOGIN, body).then((response) => createFetchResponse(response));
};

export const AuthApi = { login };

const notesUrl = '/notes';
const GET_ALL_NOTES = `${notesUrl}/all`;
const GET_NOTE = `${notesUrl}/{id}`;
const CREATE_NOTE = `${notesUrl}/create`;
const UPDATE_NOTE = `${notesUrl}/update/{id}`;
const DELETE_NOTE = `${notesUrl}/delete/{id}`;

const getAllNotes = (): Promise<FetchResponse<GetAllNotesResponse>> => {
  return api.get(GET_ALL_NOTES).then((response) => createFetchResponse(response));
};

const getNote = (id: string): Promise<FetchResponse<GetNoteReponse>> => {
  return api.get(GET_NOTE.replace('{id}', id)).then((response) => createFetchResponse(response));
};

const createNote = (body: CreateNoteRequest): Promise<FetchResponse<CreateNoteResponse>> => {
  return api.post(CREATE_NOTE, body).then((response) => createFetchResponse(response));
};

const updateNote = (id: string, body: UpdateNoteRequest): Promise<FetchResponse<UpdateNoteResponse>> => {
  return api
    .put(UPDATE_NOTE.replace('{id}', id), body)
    .then((response) => createFetchResponse(response));
};

const deleteNote = (id: string): Promise<FetchResponse<DeleteNoteResponse>> => {
  return api.delete(DELETE_NOTE.replace('{id}', id)).then((response) => createFetchResponse(response));
};

export const NoteApi = { getAllNotes, getNote, createNote, updateNote, deleteNote };

const subjectsUrl = '/subjects';
const GET_ALL_SUBJECTS = `${subjectsUrl}/all/{userId}`;
const GET_SUBJECT = `${subjectsUrl}/{id}`;
const CREATE_SUBJECT = `${subjectsUrl}/create`;
const UPDATE_SUBJECT = `${subjectsUrl}/update/{id}`;
const DELETE_SUBJECT = `${subjectsUrl}/delete/{id}`;

const getAllSubjects = (): Promise<FetchResponse<GetAllSubjectsResponse>> => {
  const userId = localStorage.getItem('userId');
  return api.get(GET_ALL_SUBJECTS.replace('{userId}', userId ?? '')).then((response) => createFetchResponse(response));
};

const getSubject = (id: string): Promise<FetchResponse<GetSubjectReponse>> => {
  return api.get(GET_SUBJECT.replace('{id}', id)).then((response) => createFetchResponse(response));
};

const createSubject = (body: CreateSubjectRequest): Promise<FetchResponse<CreateSubjectResponse>> => {
  return api.post(CREATE_SUBJECT, body).then((response) => createFetchResponse(response));
};

const updateSubject = (id: string, body: UpdateSubjectRequest): Promise<FetchResponse<UpdateSubjectResponse>> => {
  return api
    .put(UPDATE_SUBJECT.replace('{id}', id), body)
    .then((response) => createFetchResponse(response));
};

const deleteSubject = (id: string): Promise<FetchResponse<DeleteSubjectResponse>> => {
  return api.delete(DELETE_SUBJECT.replace('{id}', id)).then((response) => createFetchResponse(response));
};

export const SubjectApi = { getAllSubjects, getSubject, createSubject, updateSubject, deleteSubject };

const tasksUrl = '/task';
const GET_ALL_TASKS = `${tasksUrl}/all`;
const GET_TASK = `${tasksUrl}/{id}`;
const CREATE_TASK = `${tasksUrl}/create`;
const UPDATE_TASK = `${tasksUrl}/update/{id}`;
const DELETE_TASK = `${tasksUrl}/delete/{id}`;

const getAllTasks = (): Promise<FetchResponse<GetAllTasksResponse>> => {
  return api.get(GET_ALL_TASKS).then((response) => createFetchResponse(response));
};

const getTask = (id: string): Promise<FetchResponse<GetTaskReponse>> => {
  return api.get(GET_TASK.replace('{id}', id)).then((response) => createFetchResponse(response));
};

const createTask = (body: CreateTaskRequest): Promise<FetchResponse<CreateTaskResponse>> => {
  return api.post(CREATE_TASK, body).then((response) => createFetchResponse(response));
};

const updateTask = (id: string, body: UpdateTaskRequest): Promise<FetchResponse<UpdateTaskResponse>> => {
  return api
    .put(UPDATE_TASK.replace('{id}', id), body)
    .then((response) => createFetchResponse(response));
};

const deleteTask = (id: string): Promise<FetchResponse<DeleteTaskResponse>> => {
  return api.delete(DELETE_TASK.replace('{id}', id)).then((response) => createFetchResponse(response));
};

export const TaskApi = { getAllTasks, getTask, createTask, updateTask, deleteTask };

const usersUrl = '/users';
const GET_ALL_USERS = `${usersUrl}/all`;
const GET_USER = `${usersUrl}/{id}`;
const CREATE_USER = `${usersUrl}/create`;
const UPDATE_USER = `${usersUrl}/update/{id}`;
const DELETE_USER = `${usersUrl}/delete/{id}`;

const getAllUsers = (): Promise<FetchResponse<GetAllUsersResponse>> => {
  return api.get(GET_ALL_USERS).then((response) => createFetchResponse(response));
};

const getUser = (id: string): Promise<FetchResponse<GetUserReponse>> => {
  return api.get(GET_USER.replace('{id}', id)).then((response) => createFetchResponse(response));
};

const createUser = (body: CreateUserRequest): Promise<FetchResponse<CreateUserResponse>> => {
  return api.post(CREATE_USER, body).then((response) => createFetchResponse(response));
};

const updateUser = (id: string, body: UpdateUserRequest): Promise<FetchResponse<UpdateUserResponse>> => {
  return api
    .put(UPDATE_USER.replace('{id}', id), body)
    .then((response) => createFetchResponse(response));
};

const deleteUser = (id: string): Promise<FetchResponse<DeleteUserResponse>> => {
  return api.delete(DELETE_USER.replace('{id}', id)).then((response) => createFetchResponse(response));
};

export const UserApi = { getAllUsers, getUser, createUser, updateUser, deleteUser };
