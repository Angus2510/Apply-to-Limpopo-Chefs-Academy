declare module 'formidable' {
    import { IncomingHttpHeaders } from 'http';
    import { EventEmitter } from 'events';
  
    export interface File {
      size: number;
      path: string;
      name: string;
      type: string;
      lastModifiedDate?: Date;
      hash?: string | 'sha1' | 'md5' | 'sha256';
      toJSON(): Object;
    }
  
    export interface Fields {
      [key: string]: string | string[];
    }
  
    export interface Files {
      [key: string]: File | File[];
    }
  
    export interface IncomingFormOptions {
      encoding?: string;
      uploadDir?: string;
      keepExtensions?: boolean;
      maxFileSize?: number;
      maxFieldsSize?: number;
      maxFields?: number;
      hash?: boolean | 'sha1' | 'md5' | 'sha256';
      multiples?: boolean;
      enabledPlugins?: Array<string>;
    }
  
    export class IncomingForm extends EventEmitter {
      encoding: string;
      uploadDir: string;
      keepExtensions: boolean;
      maxFileSize: number;
      maxFieldsSize: number;
      maxFields: number;
      hash: boolean | 'sha1' | 'md5' | 'sha256';
      multiples: boolean;
  
      constructor(options?: IncomingFormOptions);
      parse(req: any, callback?: (err: any, fields: Fields, files: Files) => void): void;
      onPart(part: any): void;
      handlePart(part: any): void;
      _parseContentLength(): void;
      _flushing: number;
      _maybeEnd(): void;
    }
  }
  