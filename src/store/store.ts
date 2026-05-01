import { configureStore, createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    activeSection: "home",
    activeProjectFilter: "All",
    mobileMenuOpen: false,
    activeSkillCategory: "AI & GenAI",
  },
  reducers: {
    setActiveSection: (state, action) => { state.activeSection = action.payload; },
    setProjectFilter: (state, action) => { state.activeProjectFilter = action.payload; },
    toggleMobileMenu: (state) => { state.mobileMenuOpen = !state.mobileMenuOpen; },
    closeMobileMenu: (state) => { state.mobileMenuOpen = false; },
    setActiveSkillCategory: (state, action) => { state.activeSkillCategory = action.payload; },
  },
});

export const {
  setActiveSection,
  setProjectFilter,
  toggleMobileMenu,
  closeMobileMenu,
  setActiveSkillCategory,
} = uiSlice.actions;

export const store = configureStore({ reducer: { ui: uiSlice.reducer } });
