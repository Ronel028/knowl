import { useState, useMemo } from 'react'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import { mergeAttributes } from '@tiptap/react'
import { Extension } from '@tiptap/react'

import { FaBold, FaItalic, FaStrikethrough, FaParagraph, FaListUl, FaListOl, FaQuoteLeft   } from "react-icons/fa";
import { BiCodeBlock, BiUndo, BiRedo  } from "react-icons/bi";

const content = ''

const MenuBar = () => {
    const { editor } = useCurrentEditor()
    const [openHeading, setOpenHeading] = useState(false)

    const openHeadingMenu = () => {
      setOpenHeading(prevState => ! prevState)
    } 
  
    if (!editor) {
      return null
    }
  
    return (
      <div className="mb-2">
        <div className="button-group flex items-center gap-5">
          <div className=' relative'>
            <button type='button' onClick={openHeadingMenu} className=' py-1 px-3 border border-secondary text-sm rounded-md'>
              Heading
            </button>
            <ul className={`${openHeading ? 'block' : 'hidden'} absolute bottom-8 border border-secondary bg-light rounded-md mt-1 shadow w-[130px]`}>
              <li>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`${editor.isActive('heading', { level: 1 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                >
                  Heading 1
              </button>
              </li>
              <li>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`${editor.isActive('heading', { level: 2 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                  >
                    Heading 2
                </button>
              </li>
              <li>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`${editor.isActive('heading', { level: 3 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                  >
                    Heading 3
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                  className={`${editor.isActive('heading', { level: 4 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                >
                  Heading 4
                </button>
              </li>
              <li>
                <button
                    type='button'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={`${editor.isActive('heading', { level: 5 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                  >
                    Heading 5
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                  className={`${editor.isActive('heading', { level: 6 }) ? 'bg-secondary text-light' : ''} py-1 px-2 text-left hover:bg-secondary hover:text-light w-full`}
                >
                  Heading 6
                </button>
              </li>
            </ul>
          </div>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'bg-secondary text-light' : ''}
          >
            <FaBold />
          </button>
          <button
           type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'bg-secondary text-light' : ''}
          >
            <FaItalic />
          </button>
          <button
           type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'bg-secondary text-light' : ''}
          >
            <FaStrikethrough />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'bg-secondary text-light' : ''}
          >
            <FaParagraph />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-secondary text-light' : ''}
          >
            <FaListUl />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-secondary text-light' : ''}
          >
            <FaListOl />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'bg-secondary text-light' : ''}
          >
            <BiCodeBlock />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'bg-secondary text-light' : ''}
          >
            <FaQuoteLeft />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
          >
            <BiUndo />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
          >
            <BiRedo />
          </button>
        </div>
      </div>
    )
  }

const Tiptap = (props) => {

  const extensions = useMemo(() => {
    return [
        StarterKit.configure({
            heading: false
        }),
        Heading.configure({ levels: [1, 2] }).extend({
            levels: [1, 2],
            renderHTML({ node, HTMLAttributes }) {
                const level = this.options.levels.includes(node.attrs.level) 
                ? node.attrs.level 
                : this.options.levels[0]
                const classes = {
                    1: 'text-4xl',
                    2: 'text-3xl',
                    3: 'text-2xl',
                    4: 'text-xl',
                    5: 'text-lg',
                    6: 'text-base',
                }
                return [
                    `h${level}`,
                    mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                        class: `${classes[level]}`,
                    }),
                    0,
                ]
            },
        }),
        Extension.create({
          onUpdate({ editor }) {
            props.setRteValue('content', editor.getHTML())
          }
        })
    ]
  }, [])

  return (
    <EditorProvider 
        extensions={extensions}
        content={props.rteValue}
        slotBefore={<MenuBar />}
        className="border"
    >
    </EditorProvider>
  )
}

export default Tiptap