// components/TiptapEditor.jsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FiBold, FiItalic, FiList, FiCode } from 'react-icons/fi';
import { LuHeading2, LuHeading3, LuUndo, LuRedo, LuStrikethrough } from 'react-icons/lu';

// --- Toolbar Component ---
const Toolbar = ({ editor }) => {
  if (!editor) return null;
  
  const ToolbarButton = ({ onClick, isActive, children, title }) => (
    <button
      onClick={onClick}
      type="button"
      title={title}
      className={`p-2 rounded-md transition-colors ${
        isActive ? 'bg-gray-200 text-gray-900' : 'bg-white text-gray-600'
      } hover:bg-gray-100 hover:text-gray-900`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-t-lg p-2 flex items-center flex-wrap gap-2 bg-gray-50">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold">
        <FiBold />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic">
        <FiItalic />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough">
        <LuStrikethrough />
      </ToolbarButton>
      
      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2">
        <LuHeading2 />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3">
        <LuHeading3 />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
        <FiList />
      </ToolbarButton>
      
      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Code Block">
        <FiCode />
      </ToolbarButton>

      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
        <LuUndo />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
        <LuRedo />
      </ToolbarButton>
    </div>
  );
};


// --- Main Editor Component ---
const TiptapEditor = ({ content, onContentChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none p-4 border-l border-r border-b border-gray-300 rounded-b-lg min-h-[16rem] focus:outline-none bg-white',
      },
    },
    onUpdate({ editor }) {
      onContentChange(editor.getHTML());
    },
  });

  return (
    <div className="tiptap-editor-wrapper">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;