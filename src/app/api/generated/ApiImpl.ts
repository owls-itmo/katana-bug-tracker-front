/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Error message model */
export interface ErrorMessage {
  /**
   * @format int32
   * @example 404
   */
  statusCode: number;
  /**
   * @format date-time
   * @example "2024-04-11T12:00:00Z"
   */
  timestamp: string;
  /** @example "Resource not found" */
  description: string;
  /** @example "The requested resource could not be found" */
  message?: string;
}

/** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
export interface IssueTagInfoObject {
  /** @format int64 */
  id?: number;
  name: string;
  /** For now it's unspecified how color should be stored, and we assume it will be depend on the end implementation */
  color: string;
}

/** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
export interface IssueInfoObject {
  /** @format int64 */
  id?: number;
  title: string;
}

/** This is a standard entity data object.To avoid recursive mapping, all data objects contains a reference to serializable info objects */
export interface IssueTagDataObject {
  /** @format int64 */
  id?: number;
  name: string;
  /** For now it's unspecified how color should be stored, and we assume it will be depend on the end implementation */
  color: string;
  relatedIssues: IssueInfoObject[];
}

/** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
export interface ScrumSprintInfoObject {
  /** @format int64 */
  id?: number;
  name: string;
  description: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  deadline: string;
}

/** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
export interface ScrumEpicInfoObject {
  /** @format int64 */
  id?: number;
  name: string;
  description: string;
  /** @format date-time */
  deadline: string;
}

/** This is a standard entity data object.To avoid recursive mapping, all data objects contains a reference to serializable info objects */
export interface ScrumSprintDataObject {
  /** @format int64 */
  id?: number;
  name: string;
  description: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  deadline: string;
  /** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
  relatedEpic: ScrumEpicInfoObject;
  issues: IssueInfoObject[];
}

/** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
export interface CommentInfoObject {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime: string;
  /** @format date-time */
  lastModified?: string;
  content: string;
}

/** This is a standard entity data object.To avoid recursive mapping, all data objects contains a reference to serializable info objects */
export interface IssueDataObject {
  /** @format int64 */
  id?: number;
  title: string;
  /** @format double */
  ratio: number;
  /** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
  comment: CommentInfoObject;
  /** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
  relatedSprint?: ScrumSprintInfoObject;
  /** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
  parentIssue?: IssueInfoObject;
  tags: IssueTagInfoObject[];
  events: ScrumEventInfoObject[];
  subIssues: IssueInfoObject[];
}

/** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
export interface ScrumEventInfoObject {
  /** @format int64 */
  id?: number;
  name: string;
  description: string;
  /** @format date-time */
  date: string;
  eventReview?: string;
}

/** This is a standard entity data object.To avoid recursive mapping, all data objects contains a reference to serializable info objects */
export interface ScrumEventDataObject {
  /** @format int64 */
  id?: number;
  name: string;
  description: string;
  /** @format date-time */
  date: string;
  eventReview?: string;
  issues: IssueInfoObject[];
}

/** This is a standard entity data object.To avoid recursive mapping, all data objects contains a reference to serializable info objects */
export interface ScrumEpicDataObject {
  /** @format int64 */
  id?: number;
  name: string;
  description: string;
  /** @format date-time */
  deadline: string;
  sprints: ScrumSprintInfoObject[];
}

/** This is a standard entity data object.To avoid recursive mapping, all data objects contains a reference to serializable info objects */
export interface CommentDataObject {
  /** @format int64 */
  id?: number;
  /** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
  user: UserInfoObject;
  /** @format date-time */
  creationTime: string;
  /** @format date-time */
  lastModified?: string;
  /** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
  parentComment?: CommentInfoObject;
  content: string;
  subThread: CommentInfoObject[];
  attachedFiles: FileInfoObject[];
  ratings: CommentRatingInfoObject[];
}

/** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
export interface CommentRatingInfoObject {
  /** @format int64 */
  id?: number;
  rating: "LIKE" | "DISLIKE";
}

/** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
export interface FileInfoObject {
  /** @format int64 */
  id?: number;
  filepath: string;
  mimeType: string;
  /** @format date-time */
  uploadTime: string;
}

/** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
export interface UserInfoObject {
  /** @format int64 */
  id?: number;
  displayName: string;
}

/** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
export interface PermissionSetInfoObject {
  /** @format int64 */
  id?: number;
  name: string;
  /** @format int64 */
  permissions: number;
}

/** This is a standard entity data object.To avoid recursive mapping, all data objects contains a reference to serializable info objects */
export interface PermissionSetDataObject {
  /** @format int64 */
  id?: number;
  name: string;
  assignedUsers: UserInfoObject[];
  /** @format int64 */
  permissions: number;
}

/** This is a standard entity data object.To avoid recursive mapping, all data objects contains a reference to serializable info objects */
export interface UserDataObject {
  /** @format int64 */
  id?: number;
  displayName: string;
  /** @format double */
  ratio: number;
  /** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
  avatar?: FileInfoObject;
  /** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
  permissionSet: PermissionSetInfoObject;
  comments: CommentInfoObject[];
  ratings: CommentRatingInfoObject[];
}

/** This is a standard payload object for create some data. The main difference between Info object is that ID field doesn't exists */
export interface TagRequestPayload {
  name: string;
  color: string;
}

/** This is a standard payload object for create some data. The main difference between Info object is that ID field doesn't exists */
export interface SprintRequestPayload {
  name: string;
  description: string;
  /** @format date-time */
  deadline: string;
  /** @format int64 */
  relatedEpicId: number;
}

/** This is a standard payload object for create some data. The main difference between Info object is that ID field doesn't exists */
export interface RatingRequestPayload {
  /** @format int64 */
  commentId: number;
  rating: "LIKE" | "DISLIKE";
}

/** This is a standard entity data object.To avoid recursive mapping, all data objects contains a reference to serializable info objects */
export interface CommentRatingDataObject {
  /** @format int64 */
  id?: number;
  /** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
  comment: CommentInfoObject;
  /** This is a standard entity lightweight serializable object.To avoid recursive mapping, all data objects contains a reference to this info objects */
  user: UserInfoObject;
  rating: "LIKE" | "DISLIKE";
}

/** This is a standard payload object for create some data. The main difference between Info object is that ID field doesn't exists */
export interface IssueRequestPayload {
  title: string;
  content: string;
  attachedFilesIds: number[];
}

/** This is a standard payload object for create some data. The main difference between Info object is that ID field doesn't exists */
export interface EventRequestPayload {
  name: string;
  description: string;
  /** @format date-time */
  date: string;
}

/** This is a standard payload object for create some data. The main difference between Info object is that ID field doesn't exists */
export interface EpicRequestPayload {
  name: string;
  description: string;
  /** @format date-time */
  deadline: string;
}

/** This is a standard payload object for create some data. The main difference between Info object is that ID field doesn't exists */
export interface CommentRequestPayload {
  /** @format int64 */
  parentCommentId: number;
  content: string;
  attachedFilesIds: number[];
}

/** This is a standard payload object for create some data. The main difference between Info object is that ID field doesn't exists */
export interface RegisterRequestPayload {
  username: string;
  displayName: string;
  email: string;
  password: string;
}

/** JWT token response Data object */
export interface JWTTokenResponseDTO {
  /** @example "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MjUyLCJzdWIiOiJaZXJ1bWkiLCJpYXQiOjE3MzE4ODQ0NDQsImV4cCI6MTczMjAyODQ0NH0.a07DlL4EyYi1jklA_BO2dJ-xX3ONGiw6GBW6brzlwQk" */
  token: string;
}

/** This is a standard payload object for create some data. The main difference between Info object is that ID field doesn't exists */
export interface AuthRequestPayload {
  login: string;
  password: string;
}

/** This is a standard payload object for create some data. The main difference between Info object is that ID field doesn't exists */
export interface PermissionRequestPayload {
  name: string;
  /** @format int64 */
  permissions: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8080" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Katána API
 * @version 1.0.0
 * @baseUrl http://localhost:8080
 * @contact Zerumi <367837@edu.itmo.ru>
 *
 * Kotlin Language Server (Katána Project) bugtracker back-end
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description This operation requires MANAGE_TAG permission
     *
     * @tags Issue Tag API
     * @name UpdateTag
     * @summary Update issue tag
     * @request PUT:/api/v1/tag
     * @secure
     */
    updateTag: (data: IssueTagInfoObject, params: RequestParams = {}) =>
      this.request<IssueTagDataObject, ErrorMessage>({
        path: `/api/v1/tag`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_TAG permission
     *
     * @tags Issue Tag API
     * @name CreateTag
     * @summary Create issue tag
     * @request POST:/api/v1/tag
     * @secure
     */
    createTag: (data: TagRequestPayload, params: RequestParams = {}) =>
      this.request<IssueTagDataObject, ErrorMessage>({
        path: `/api/v1/tag`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_TAG permission
     *
     * @tags Issue Tag API
     * @name DeleteTag
     * @summary Delete issue tag
     * @request DELETE:/api/v1/tag
     * @secure
     */
    deleteTag: (data: IssueTagInfoObject, params: RequestParams = {}) =>
      this.request<void, ErrorMessage>({
        path: `/api/v1/tag`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_SPRINT permission
     *
     * @tags Scrum Sprint API
     * @name UpdateSprint
     * @summary Update scrum sprint
     * @request PUT:/api/v1/sprint
     * @secure
     */
    updateSprint: (data: ScrumSprintInfoObject, params: RequestParams = {}) =>
      this.request<ScrumSprintDataObject, ErrorMessage>({
        path: `/api/v1/sprint`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_SPRINT permission
     *
     * @tags Scrum Sprint API
     * @name CreateSprint
     * @summary Create scrum sprint
     * @request POST:/api/v1/sprint
     * @secure
     */
    createSprint: (data: SprintRequestPayload, params: RequestParams = {}) =>
      this.request<ScrumSprintDataObject, ErrorMessage>({
        path: `/api/v1/sprint`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_SPRINT permission
     *
     * @tags Scrum Sprint API
     * @name DeleteSprint
     * @summary Delete scrum sprint
     * @request DELETE:/api/v1/sprint
     * @secure
     */
    deleteSprint: (data: ScrumSprintInfoObject, params: RequestParams = {}) =>
      this.request<void, ErrorMessage>({
        path: `/api/v1/sprint`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_SPRINT permission
     *
     * @tags Scrum Sprint API
     * @name LinkSprintToIssue
     * @summary Link scrum sprint to issue
     * @request PUT:/api/v1/sprint/{sprintId}/toIssue/{issueId}
     * @secure
     */
    linkSprintToIssue: (sprintId: number, issueId: number, params: RequestParams = {}) =>
      this.request<ScrumSprintDataObject, ErrorMessage>({
        path: `/api/v1/sprint/${sprintId}/toIssue/${issueId}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_SPRINT permission
     *
     * @tags Scrum Sprint API
     * @name LinkSprintToEpic
     * @summary Link scrum sprint to scrum epic
     * @request PUT:/api/v1/sprint/{sprintId}/toEpic/{epicId}
     * @secure
     */
    linkSprintToEpic: (sprintId: number, epicId: number, params: RequestParams = {}) =>
      this.request<ScrumSprintDataObject, ErrorMessage>({
        path: `/api/v1/sprint/${sprintId}/toEpic/${epicId}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires issue ownership or UPDATE_ANY_ISSUE permission
     *
     * @tags Issue API
     * @name UpdateIssue
     * @summary Update an issue
     * @request PUT:/api/v1/issue
     * @secure
     */
    updateIssue: (data: IssueInfoObject, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires CREATE_ISSUE permission
     *
     * @tags Issue API
     * @name CreateIssue
     * @summary Create an issue
     * @request POST:/api/v1/issue
     * @secure
     */
    createIssue: (data: IssueRequestPayload, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires issue ownership or UPDATE_ANY_ISSUE permission
     *
     * @tags Issue API
     * @name DeleteIssue
     * @summary Delete an issue
     * @request DELETE:/api/v1/issue
     * @secure
     */
    deleteIssue: (data: IssueInfoObject, params: RequestParams = {}) =>
      this.request<void, ErrorMessage>({
        path: `/api/v1/issue`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_ISSUE permission
     *
     * @tags Issue API
     * @name LinkToIssue
     * @summary Link subIssue to issue
     * @request PUT:/api/v1/issue/{subIssueId}/toIssue/{issueId}
     * @secure
     */
    linkToIssue: (subIssueId: number, issueId: number, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue/${subIssueId}/toIssue/${issueId}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_TAG permission
     *
     * @tags Issue API
     * @name LinkIssueToTag
     * @summary Link issue to tag
     * @request PUT:/api/v1/issue/{issueId}/toTag/{tagId}
     * @secure
     */
    linkIssueToTag: (issueId: number, tagId: number, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue/${issueId}/toTag/${tagId}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_SPRINT permission
     *
     * @tags Issue API
     * @name LinkToSprint
     * @summary Link issue to scrum sprint
     * @request PUT:/api/v1/issue/{issueId}/toSprint/{sprintId}
     * @secure
     */
    linkToSprint: (issueId: number, sprintId: number, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue/${issueId}/toSprint/${sprintId}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_EVENT permission
     *
     * @tags Issue API
     * @name LinkIssueToEvent
     * @summary Link issue to scrum event
     * @request PUT:/api/v1/issue/{issueId}/toEvent/{eventId}
     * @secure
     */
    linkIssueToEvent: (issueId: number, eventId: number, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue/${issueId}/toEvent/${eventId}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_EVENTS permission
     *
     * @tags Scrum Event API
     * @name UpdateEvent
     * @summary Update an event
     * @request PUT:/api/v1/event
     * @secure
     */
    updateEvent: (data: ScrumEventInfoObject, params: RequestParams = {}) =>
      this.request<ScrumEventDataObject, ErrorMessage>({
        path: `/api/v1/event`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_EVENTS permission
     *
     * @tags Scrum Event API
     * @name CreateEvent
     * @summary Create an event
     * @request POST:/api/v1/event
     * @secure
     */
    createEvent: (data: EventRequestPayload, params: RequestParams = {}) =>
      this.request<ScrumEventDataObject, ErrorMessage>({
        path: `/api/v1/event`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_EVENTS permission
     *
     * @tags Scrum Event API
     * @name DeleteEvent
     * @summary Delete an event
     * @request DELETE:/api/v1/event
     * @secure
     */
    deleteEvent: (data: ScrumEventInfoObject, params: RequestParams = {}) =>
      this.request<void, ErrorMessage>({
        path: `/api/v1/event`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_EVENTS permission
     *
     * @tags Scrum Event API
     * @name LinkEventToIssue
     * @summary Link event to issue
     * @request PUT:/api/v1/event/{eventId}/toIssue/{issueId}
     * @secure
     */
    linkEventToIssue: (eventId: number, issueId: number, params: RequestParams = {}) =>
      this.request<ScrumEventDataObject, ErrorMessage>({
        path: `/api/v1/event/${eventId}/toIssue/${issueId}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_EPIC permission
     *
     * @tags Scrum Epic API
     * @name UpdateEpic
     * @summary Update an epic
     * @request PUT:/api/v1/epic
     * @secure
     */
    updateEpic: (data: ScrumEpicInfoObject, params: RequestParams = {}) =>
      this.request<ScrumEpicDataObject, ErrorMessage>({
        path: `/api/v1/epic`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_EPIC permission
     *
     * @tags Scrum Epic API
     * @name CreateEpic
     * @summary Create an epic
     * @request POST:/api/v1/epic
     * @secure
     */
    createEpic: (data: EpicRequestPayload, params: RequestParams = {}) =>
      this.request<ScrumEpicDataObject, ErrorMessage>({
        path: `/api/v1/epic`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_EPIC permission
     *
     * @tags Scrum Epic API
     * @name DeleteEpic
     * @summary Delete an epic
     * @request DELETE:/api/v1/epic
     * @secure
     */
    deleteEpic: (data: ScrumEpicInfoObject, params: RequestParams = {}) =>
      this.request<void, ErrorMessage>({
        path: `/api/v1/epic`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires comment ownership or UPDATE_ANY_COMMENT permission
     *
     * @tags Comment API
     * @name UpdateComment
     * @summary Update a comment
     * @request PUT:/api/v1/comment
     * @secure
     */
    updateComment: (data: CommentInfoObject, params: RequestParams = {}) =>
      this.request<CommentDataObject, ErrorMessage>({
        path: `/api/v1/comment`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires CREATE_COMMENT permission
     *
     * @tags Comment API
     * @name CreateReply
     * @summary Create a reply to comment by its id. New comments may be created only via creating issue
     * @request POST:/api/v1/comment
     * @secure
     */
    createReply: (data: CommentRequestPayload, params: RequestParams = {}) =>
      this.request<CommentDataObject, ErrorMessage>({
        path: `/api/v1/comment`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires comment ownership or UPDATE_ANY_COMMENT permission
     *
     * @tags Comment API
     * @name DeleteComment
     * @summary Delete a comment
     * @request DELETE:/api/v1/comment
     * @secure
     */
    deleteComment: (data: CommentInfoObject, params: RequestParams = {}) =>
      this.request<void, ErrorMessage>({
        path: `/api/v1/comment`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin API
     * @name GetPermissionSets
     * @summary Get all permission sets
     * @request GET:/api/v1/admin/permissionSet
     */
    getPermissionSets: (params: RequestParams = {}) =>
      this.request<PermissionSetDataObject[], ErrorMessage>({
        path: `/api/v1/admin/permissionSet`,
        method: "GET",
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_USER_PERMISSIONS permission
     *
     * @tags Admin API
     * @name UpdatePermissionSet
     * @summary Update a permission set
     * @request PUT:/api/v1/admin/permissionSet
     * @secure
     */
    updatePermissionSet: (data: PermissionSetInfoObject, params: RequestParams = {}) =>
      this.request<PermissionSetDataObject, ErrorMessage>({
        path: `/api/v1/admin/permissionSet`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_USER_PERMISSIONS permission
     *
     * @tags Admin API
     * @name CreatePermissionSet
     * @summary Create a permission set
     * @request POST:/api/v1/admin/permissionSet
     * @secure
     */
    createPermissionSet: (data: PermissionRequestPayload, params: RequestParams = {}) =>
      this.request<PermissionSetDataObject, ErrorMessage>({
        path: `/api/v1/admin/permissionSet`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_USER_PERMISSIONS permission
     *
     * @tags Admin API
     * @name DeletePermissionSet
     * @summary Delete a permission set
     * @request DELETE:/api/v1/admin/permissionSet
     * @secure
     */
    deletePermissionSet: (data: PermissionSetInfoObject, params: RequestParams = {}) =>
      this.request<void, ErrorMessage>({
        path: `/api/v1/admin/permissionSet`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_USER_PERMISSIONS permission
     *
     * @tags Admin API
     * @name LinkUserToPermissionSet
     * @summary Link user to permission set
     * @request PUT:/api/v1/admin/permissionSet/{userId}/toPermissionSet/{permissionSetId}
     * @secure
     */
    linkUserToPermissionSet: (userId: number, permissionSetId: number, params: RequestParams = {}) =>
      this.request<UserDataObject, ErrorMessage>({
        path: `/api/v1/admin/permissionSet/${userId}/toPermissionSet/${permissionSetId}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires LEAVE_REACTIONS permission
     *
     * @tags Comment Rating API
     * @name CreateRating
     * @summary Leave reaction on comment
     * @request POST:/api/v1/rating
     * @secure
     */
    createRating: (data: RatingRequestPayload, params: RequestParams = {}) =>
      this.request<CommentRatingDataObject, ErrorMessage>({
        path: `/api/v1/rating`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This operation requires LEAVE_REACTIONS permission
     *
     * @tags Comment Rating API
     * @name DeleteRating
     * @summary Remove reaction from comment
     * @request DELETE:/api/v1/rating
     * @secure
     */
    deleteRating: (data: RatingRequestPayload, params: RequestParams = {}) =>
      this.request<void, ErrorMessage>({
        path: `/api/v1/rating`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Create new user account in database.
     *
     * @tags Auth API
     * @name Register
     * @summary Registers client in system.
     * @request POST:/api/v1/auth/register
     */
    register: (data: RegisterRequestPayload, params: RequestParams = {}) =>
      this.request<JWTTokenResponseDTO, ErrorMessage>({
        path: `/api/v1/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Generate a new JWT for user requests and using username and password
     *
     * @tags Auth API
     * @name Login
     * @summary Generates a new JWT for user requests
     * @request POST:/api/v1/auth/login
     */
    login: (data: AuthRequestPayload, params: RequestParams = {}) =>
      this.request<JWTTokenResponseDTO, ErrorMessage>({
        path: `/api/v1/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Issue Tag API
     * @name GetTag
     * @summary Get an issue tag by its id
     * @request GET:/api/v1/tag/{id}
     */
    getTag: (id: number, params: RequestParams = {}) =>
      this.request<IssueTagDataObject, ErrorMessage>({
        path: `/api/v1/tag/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Issue Tag API
     * @name GetTags
     * @summary Get tags in paged view
     * @request GET:/api/v1/tag/page/{pageNo}/{tagsPerPage}
     */
    getTags: (pageNo: number, tagsPerPage: number, params: RequestParams = {}) =>
      this.request<IssueTagDataObject[], ErrorMessage>({
        path: `/api/v1/tag/page/${pageNo}/${tagsPerPage}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scrum Sprint API
     * @name GetSprint
     * @summary Get a sprint by its id
     * @request GET:/api/v1/sprint/{id}
     */
    getSprint: (id: number, params: RequestParams = {}) =>
      this.request<ScrumSprintDataObject, ErrorMessage>({
        path: `/api/v1/sprint/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scrum Sprint API
     * @name GetSprints
     * @summary Get epics in paged view
     * @request GET:/api/v1/sprint/page/{pageNo}/{epicsPerPage}
     */
    getSprints: (pageNo: number, epicsPerPage: number, params: RequestParams = {}) =>
      this.request<ScrumSprintDataObject[], ErrorMessage>({
        path: `/api/v1/sprint/page/${pageNo}/${epicsPerPage}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Issue API
     * @name GetIssue
     * @summary Get an issue by its id
     * @request GET:/api/v1/issue/{id}
     */
    getIssue: (id: number, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description All issues on page sorted by it's ratio value
     *
     * @tags Issue API
     * @name GetIssues
     * @summary Get issues in paged view
     * @request GET:/api/v1/issue/page/{pageNo}/{issuesPerPage}
     */
    getIssues: (pageNo: number, issuesPerPage: number, params: RequestParams = {}) =>
      this.request<IssueDataObject[], ErrorMessage>({
        path: `/api/v1/issue/page/${pageNo}/${issuesPerPage}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scrum Event API
     * @name GetEvent
     * @summary Get an event by its id
     * @request GET:/api/v1/event/{id}
     */
    getEvent: (id: number, params: RequestParams = {}) =>
      this.request<ScrumEventDataObject, ErrorMessage>({
        path: `/api/v1/event/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scrum Event API
     * @name GetEvents
     * @summary Get events in paged view
     * @request GET:/api/v1/event/page/{pageNo}/{eventsPerPage}
     */
    getEvents: (pageNo: number, eventsPerPage: number, params: RequestParams = {}) =>
      this.request<ScrumEventDataObject[], ErrorMessage>({
        path: `/api/v1/event/page/${pageNo}/${eventsPerPage}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scrum Epic API
     * @name GetEpic
     * @summary Get an epic by its id
     * @request GET:/api/v1/epic/{id}
     */
    getEpic: (id: number, params: RequestParams = {}) =>
      this.request<ScrumEpicDataObject, ErrorMessage>({
        path: `/api/v1/epic/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scrum Epic API
     * @name GetEpics
     * @summary Get epics in paged view
     * @request GET:/api/v1/epic/page/{pageNo}/{epicsPerPage}
     */
    getEpics: (pageNo: number, epicsPerPage: number, params: RequestParams = {}) =>
      this.request<ScrumEpicDataObject[], ErrorMessage>({
        path: `/api/v1/epic/page/${pageNo}/${epicsPerPage}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comment API
     * @name GetComment
     * @summary Get a comment by its id
     * @request GET:/api/v1/comment/{id}
     */
    getComment: (id: number, params: RequestParams = {}) =>
      this.request<CommentDataObject, ErrorMessage>({
        path: `/api/v1/comment/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin API
     * @name GetPermissionSet
     * @summary Get a permission set by its id
     * @request GET:/api/v1/admin/permissionSet/{id}
     */
    getPermissionSet: (id: number, params: RequestParams = {}) =>
      this.request<PermissionSetDataObject, ErrorMessage>({
        path: `/api/v1/admin/permissionSet/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_SPRINT permission
     *
     * @tags Scrum Sprint API
     * @name UnlinkSprintFromIssue
     * @summary Unlink scrum sprint from issue
     * @request DELETE:/api/v1/sprint/{sprintId}/fromIssue/{issueId}
     * @secure
     */
    unlinkSprintFromIssue: (sprintId: number, issueId: number, params: RequestParams = {}) =>
      this.request<ScrumSprintDataObject, ErrorMessage>({
        path: `/api/v1/sprint/${sprintId}/fromIssue/${issueId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_TAG permission
     *
     * @tags Issue API
     * @name UnlinkFromTag
     * @summary Unlink issue from tag
     * @request DELETE:/api/v1/issue/fromTag/{issueId}/{tagId}
     * @secure
     */
    unlinkFromTag: (issueId: number, tagId: number, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue/fromTag/${issueId}/${tagId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_SPRINT permission
     *
     * @tags Issue API
     * @name UnlinkFromSprint
     * @summary Unlink issue from scrum sprint
     * @request DELETE:/api/v1/issue/fromSprint/{issueId}
     * @secure
     */
    unlinkFromSprint: (issueId: number, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue/fromSprint/${issueId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_ISSUE permission
     *
     * @tags Issue API
     * @name UnlinkFromIssue
     * @summary Unlink issue from parent issue
     * @request DELETE:/api/v1/issue/fromIssue/{issueId}
     * @secure
     */
    unlinkFromIssue: (issueId: number, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue/fromIssue/${issueId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_EVENT permission
     *
     * @tags Issue API
     * @name UnlinkFromEvent
     * @summary Unlink issue from scrum event
     * @request DELETE:/api/v1/issue/fromEvent/{issueId}/{eventId}
     * @secure
     */
    unlinkFromEvent: (issueId: number, eventId: number, params: RequestParams = {}) =>
      this.request<IssueDataObject, ErrorMessage>({
        path: `/api/v1/issue/fromEvent/${issueId}/${eventId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description This operation requires MANAGE_EVENTS permission
     *
     * @tags Scrum Event API
     * @name UnlinkEventFromIssue
     * @summary Unlink event from issue
     * @request DELETE:/api/v1/event/{eventId}/fromIssue/{issueId}
     * @secure
     */
    unlinkEventFromIssue: (eventId: number, issueId: number, params: RequestParams = {}) =>
      this.request<ScrumEventDataObject, ErrorMessage>({
        path: `/api/v1/event/${eventId}/fromIssue/${issueId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
