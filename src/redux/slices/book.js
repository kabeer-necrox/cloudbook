import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  book: null,
  isCollaborator: false,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setIsCollaborator: (state, action) => {
      state.isCollaborator = action.payload;
    },
    setBook: (state, action) => {
      state.book = action.payload;
    },
    setTitle: (state, action) => {
      state.book = { ...state.book, title: action.payload };
    },
    addSection: (state, action) => {
      const updateState = (sections) => {
        return sections.map((section) => {
          if (section.id === action.payload.parentId) {
            return {
              ...section,
              subsections: [
                ...section.subsections,
                {
                  id: uuidv4(),
                  title: "New subsection",
                  description: "",
                  subsections: [],
                },
              ],
            };
          } else if (section.subsections.length > 0) {
            return {
              ...section,
              subsections: updateState(section.subsections),
            };
          }
          return section;
        });
      };

      state.book = {
        ...state.book,
        sections: updateState(state.book.sections),
      };
    },
    removeSection: (state, action) => {
      const updateState = (sections) => {
        return sections.map((section) => {
          if (section.id === action.payload.parentId) {
            return {
              ...section,
              subsections: section.subsections.filter(
                (subsection) => subsection.id !== action.payload.id
              ),
            };
          } else if (section.subsections.length > 0) {
            return {
              ...section,
              subsections: updateState(section.subsections),
            };
          }
          return section;
        });
      };

      state.book = {
        ...state.book,
        sections: updateState(state.book.sections),
      };
    },
    setSectionTitle: (state, action) => {
      const updateState = (sections) => {
        return sections.map((section) => {
          if (section.id === action.payload.id) {
            return {
              ...section,
              title: action.payload.title,
            };
          } else if (section.subsections.length > 0) {
            return {
              ...section,
              subsections: updateState(section.subsections),
            };
          }
          return section;
        });
      };

      state.book = {
        ...state.book,
        title: state.book.title,
        sections: updateState(state.book.sections),
      };
    },
  },
});

export const {
  setIsCollaborator,
  setBook,
  setTitle,
  addSection,
  removeSection,
  setSectionTitle,
} = bookSlice.actions;

export default bookSlice.reducer;
