import type { MutableRefObject } from 'react';
import { uploadEditorMedia, type QuillRefLike } from '@/utils/editor-media-upload';

type EditorErrorHandler = (message: string, error?: unknown) => void;

interface BuildEditorModulesOptions {
  quillRef: MutableRefObject<QuillRefLike | null>;
  onMediaError?: EditorErrorHandler;
}

export const RICH_TEXT_EDITOR_FORMATS = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'script',
  'list',
  'bullet',
  'indent',
  'align',
  'blockquote',
  'code-block',
  'link',
  'image',
  'video',
];

export const buildRichTextEditorModules = ({
  quillRef,
  onMediaError,
}: BuildEditorModulesOptions) => ({
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    handlers: {
      image: () =>
        uploadEditorMedia({
          quillRef,
          accept: 'image/*',
          mediaType: 'image',
          onError: onMediaError,
        }),
      video: () =>
        uploadEditorMedia({
          quillRef,
          accept: 'video/*',
          mediaType: 'video',
          onError: onMediaError,
        }),
    },
  },
});
