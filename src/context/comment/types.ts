export interface commentlist{
  id: number;
  User: User;
  description: string;
  createdAt: string;
  owner: number;
}
export type User = {
  id: number;
  name: string;
  email: string;
};

export type CommentData = commentlist[];
export interface Commentstate {
    isLoading: boolean;
    isError: boolean;
    comment: CommentData
    createdAt:string;
  }
  export type commentsPayload = Omit<Commentstate, "isloading" | "iserror" >;
 
  // Actions that are available
  export enum COMMENTListAvailableAction {
    FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST",
    FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS",
    FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE",
  
  
    CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST",
    CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS",
    CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE",
  
   
  
   
  }
  export type commentssDispatch = React.Dispatch<COMMENTActions>;
  export type COMMENTActions =
    
    | { type: COMMENTListAvailableAction.FETCH_COMMENTS_REQUEST }
    | { type: COMMENTListAvailableAction.FETCH_COMMENTS_SUCCESS; payload:CommentData }
    | { type: COMMENTListAvailableAction.FETCH_COMMENTS_FAILURE }
  
    | { type: COMMENTListAvailableAction.CREATE_COMMENT_REQUEST }
    | { type: COMMENTListAvailableAction.CREATE_COMMENT_SUCCESS }
    | { type: COMMENTListAvailableAction.CREATE_COMMENT_FAILURE}
  
  