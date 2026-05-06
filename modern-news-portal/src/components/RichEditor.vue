<template>
  <div class="border border-gray-300 rounded-2xl overflow-hidden">
    <!-- Toolbar -->
    <div class="flex flex-wrap gap-1 p-3 border-b border-gray-200 bg-gray-50">
      <button
        v-for="btn in toolbarButtons"
        :key="btn.label"
        @click="btn.action"
        :class="[
          'px-3 py-1.5 text-sm rounded-lg transition font-medium',
          btn.isActive?.() ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
        ]"
        type="button"
      >
        {{ btn.label }}
      </button>
    </div>

    <!-- Editor -->
    <editor-content
      :editor="editor"
      class="min-h-[200px] px-5 py-4 text-gray-900 prose max-w-none focus:outline-none"
    />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { watch } from 'vue'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Placeholder.configure({ placeholder: 'Viết nội dung bài viết...' })
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  }
})

watch(() => props.modelValue, (val) => {
  if (editor.value && val !== editor.value.getHTML()) {
    editor.value.commands.setContent(val || '')
  }
})

const toolbarButtons = [
  { label: 'B', action: () => editor.value?.chain().focus().toggleBold().run(), isActive: () => editor.value?.isActive('bold') },
  { label: 'I', action: () => editor.value?.chain().focus().toggleItalic().run(), isActive: () => editor.value?.isActive('italic') },
  { label: 'H1', action: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => editor.value?.isActive('heading', { level: 1 }) },
  { label: 'H2', action: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => editor.value?.isActive('heading', { level: 2 }) },
  { label: '• List', action: () => editor.value?.chain().focus().toggleBulletList().run(), isActive: () => editor.value?.isActive('bulletList') },
  { label: '1. List', action: () => editor.value?.chain().focus().toggleOrderedList().run(), isActive: () => editor.value?.isActive('orderedList') },
  { label: '❝', action: () => editor.value?.chain().focus().toggleBlockquote().run(), isActive: () => editor.value?.isActive('blockquote') },
  { label: '—', action: () => editor.value?.chain().focus().setHorizontalRule().run() },
  { label: 'Undo', action: () => editor.value?.chain().focus().undo().run() },
  { label: 'Redo', action: () => editor.value?.chain().focus().redo().run() },
]
</script>

<style>
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}
.tiptap:focus { outline: none; }
</style>