export interface articlelist {

  id: number;
  sport: item;
  summary: string;
  teams: teamlist[];
  thumbnail: string;
  title: string;
  date: string;
}
export type item = {
  id: number;
  name: string;

};
export type teamlist = {
  id: number;
  name: string;
}


export interface articlestate {
  isLoading: boolean;
  isError: boolean;
  article: articlelist[];
  createdAt: string;
}
export type articlesPayload = Omit<articlestate, "isloading" | "iserror">;

// Actions that are available
export enum ARTICLEListAvailableAction {
  FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST",
  FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS",
  FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE",


  CREATE_ARTICLE_REQUEST = "CREATE_ARTICLE_REQUEST",
  CREATE_ARTICLE_SUCCESS = "CREATE_ARTICLE_SUCCESS",
  CREATE_ARTICLE_FAILURE = "CREATE_ARTICLE_FAILURE",




}
export type articlesDispatch = React.Dispatch<ARTICLEActions>;
export type ARTICLEActions =

  | { type: ARTICLEListAvailableAction.FETCH_ARTICLES_REQUEST }
  | { type: ARTICLEListAvailableAction.FETCH_ARTICLES_SUCCESS; payload: articlelist[] }
  | { type: ARTICLEListAvailableAction.FETCH_ARTICLES_FAILURE }

  | { type: ARTICLEListAvailableAction.CREATE_ARTICLE_REQUEST }
  | { type: ARTICLEListAvailableAction.CREATE_ARTICLE_SUCCESS }
  | { type: ARTICLEListAvailableAction.CREATE_ARTICLE_FAILURE }

