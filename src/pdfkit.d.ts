declare module 'pdfkit' {
    import { Readable } from 'stream';
  
    namespace PDFKit {
      interface DocumentOptions {
        compress?: boolean;
        info?: any;
        layout?: 'portrait' | 'landscape';
        margins?: { top: number; left: number; bottom: number; right: number };
        size?: string | number[];
        autoFirstPage?: boolean;
      }
  
      interface TextOptions {
        align?: 'left' | 'center' | 'right' | 'justify';
        link?: string;
        underline?: boolean;
        strike?: boolean;
        indent?: number;
        paragraphGap?: number;
        lineGap?: number;
        wordSpacing?: number;
        characterSpacing?: number;
        oblique?: boolean;
        bold?: boolean;
        continued?: boolean;
      }
    }
  
    class PDFDocument extends Readable {
      constructor(options?: PDFKit.DocumentOptions);
      addPage(options?: PDFKit.DocumentOptions): this;
      text(text: string, x?: number, y?: number, options?: PDFKit.TextOptions): this;
      image(src: string | Buffer, x?: number, y?: number, options?: { fit?: number[]; align?: 'center' }): this;
      end(): void;
    }
  
    export = PDFDocument;
  }
  