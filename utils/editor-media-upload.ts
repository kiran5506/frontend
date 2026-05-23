import type { MutableRefObject } from 'react';

export type EditorMediaType = 'image' | 'video';

type EditorSelection = {
  index: number;
};

type EditorLike = {
  getSelection: (focus?: boolean) => EditorSelection | null;
  getLength: () => number;
  insertEmbed: (index: number, type: string, value: string) => void;
  clipboard: {
    dangerouslyPasteHTML: (index: number, html: string) => void;
  };
};

export type QuillRefLike = {
  getEditor?: () => EditorLike;
};

interface UploadEditorMediaOptions {
  quillRef: MutableRefObject<QuillRefLike | null>;
  accept: string;
  mediaType: EditorMediaType;
  onError?: (message: string, error?: unknown) => void;
}

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

export const uploadEditorMedia = async ({
  quillRef,
  accept,
  mediaType,
  onError,
}: UploadEditorMediaOptions): Promise<void> => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', accept);
  input.click();

  await new Promise<void>((resolve) => {
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        resolve();
        return;
      }

      try {
        const dataUrl = await fileToDataUrl(file);
        const editor = quillRef.current?.getEditor?.();

        if (!editor) {
          resolve();
          return;
        }

        const range = editor.getSelection(true);
        const index = range?.index ?? editor.getLength();

        if (mediaType === 'image') {
          editor.insertEmbed(index, 'image', dataUrl);
        } else {
          editor.clipboard.dangerouslyPasteHTML(
            index,
            `<p><video controls src="${dataUrl}" style="max-width:100%;height:auto;"></video></p>`
          );
        }
      } catch (error) {
        onError?.(`Failed to upload ${mediaType}`, error);
      } finally {
        resolve();
      }
    };
  });
};
