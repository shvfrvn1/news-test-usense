export interface FetchParams {
  section?: string
  query?: string
  page?: number
  pageSize?: number
}

export interface GuardianSearchResponse<T> {
  response: {
    status: 'ok' | 'error';
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    content?: T;
    results?: T[];
  }
}

export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted?: boolean;
  pillarId?: string;
  pillarName?: string;

  fields?: Partial<GuardianFields>;
  tags?: GuardianTag[];
  blocks?: GuardianBlocks;
  elements?: GuardianElement[];
  references?: GuardianReference[];
  rights?: string[];
}

// show-fields
export interface GuardianFields {
  trailText?: string              // HTML
  headline?: string
  showInRelatedContent?: string
  body?: string
  lastModified?: string           // Datetime
  hasStoryPackage?: string        // boolean
  score?: string                  // float
  standfirst?: string             // HTML
  shortUrl?: string
  thumbnail?: string
  wordcount?: string              // Integer
  commentable?: string            // Boolean
  isPremoderated?: string         // Boolean
  allowUgc?: string               // Boolean
  byline?: string                 // HTML
  publication?: string
  internalPageCode?: string
  productionOffice?: string
  shouldHideAdverts?: string      // Boolean
  liveBloggingNow?: string        // Boolean
  commentCloseDate?: string       // Datetime
  starRating?: string             // Integer
  // all?: string
}


export interface GuardianReference {
  id: string;
  type: 'isbn' | 'author' | 'opti-cricket-match' | string;
}
export interface GuardianTag {
  id: string;
  type: string;
  sectionId?: string;
  sectionName?: string;
  webTitle: string;
  webUrl?: string;
  apiUrl?: string;
  references?: GuardianReference[];
}

export interface GuardianBlocks {
  main?: GuardianBlock[];
  body?: GuardianBlock[];
}

export interface GuardianBlock {
  id: string;
  bodyHtml?: string;
  bodyText?: string;
  published?: boolean;
  contributors?: string[];
}

export interface GuardianElement {
  type: 'image' | 'video' | 'audio' | string;
  assets: GuardianAsset[];
}

export interface GuardianAsset {
  type: string;
  mimeType?: string;
  file?: string;
}