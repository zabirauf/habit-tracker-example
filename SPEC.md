Below is a concise specification you can hand off to a developer (or another AI) to build your single-page React application for habit tracking.

---

## Project Overview

- A **single habit** tracking app for the current year, arranged as a **12-column layout** (one column per month).
- Each column has **fixed rows (1–31)**; days that don’t exist in that month remain blank/disabled.
- A **skeuomorphic** design for marking days “on” (an LED with a glow) or “off” (unlit).
- A **monthly streak count** at the bottom of each month’s column.
- Data is stored in the browser’s **localStorage** for simplicity.
- Option to **export** the data as a **Markdown table** (with “✅” indicating marked days).
- An end-of-year **reset** flow that prompts the user before clearing data and moving to the new year (with an option to export first).

---

## User Experience Details

1. **Layout & Navigation**  
   - **Single-page** layout with 12 columns side by side for Jan–Dec.  
   - Rows for days (1–31). Blank/inactive rows for days beyond a month’s actual length.  
   - Use **horizontal scroll** to navigate months. Ensure the **current month is centered** on load.  
   - Optionally, include **left/right arrow buttons** or a quick “jump to month” dropdown if you want more navigability.

2. **Marking a Day**  
   - Click a day cell to toggle the LED “on” (with a glowing border) or “off” (no glow).  
   - Immediately save the updated status in **localStorage**.

3. **Monthly Streak Calculation**  
   - At the bottom of each month’s column, display a simple integer representing the **longest streak** (or current streak, depending on your requirement) for that month.  
   - The streak calculation resets each month; it does **not** carry over from one month to the next.

4. **Year-End Reset & Data Handling**  
   - At the end of the year (or upon user request), provide a “Start New Year” or “Reset Year” button.  
   - **Prompt** the user for confirmation, reminding them they will lose current data unless they export.  
   - If confirmed, the app creates a **new blank table** for the new year and clears localStorage for the old data.

5. **Export to Markdown**  
   - Single consolidated **Markdown table** with columns for each month and rows for days.  
   - Days marked “on” in the app are shown with a “✅” symbol; days “off” are blank.  
   - Triggered via an **Export** button that initiates a file download.  
   - Use a sensible default filename, e.g., `habit-tracker-year.md`.

---

## Technical Details

1. **Technology Stack**  
   - **React** (v18+ or whichever stable version you prefer).  
   - **TypeScript** for type safety.  
   - **Tailwind CSS** for styling, ensuring a consistent look and easy customization.

2. **Data Model**  
   - Store **day states** (on/off) in a structure keyed by `year -> month -> day`. For instance:  
     ```ts
     type HabitData = {
       [year: number]: {
         [month: number]: {
           [day: number]: boolean;
         };
       };
     };
     ```  
   - Use **localStorage** keys like `habitData` to persist the above structure in JSON format.

3. **Component Structure**  
   - `App` Component  
     - Manages **current year** state, handles the logic for reset/export, and organizes the monthly columns.  
   - `MonthColumn` Component  
     - Renders a single month’s grid (up to 31 days).  
     - Displays the streak count at the bottom.  
     - Handles day toggles and updates the data store.  
   - Utility modules for:  
     - **Calculating streaks**.  
     - **Exporting** data to Markdown.  
     - **Scrolling** logic to center on the current month.

4. **Styling & Skeuomorphic Design**  
   - Tailwind classes to position columns (`flex`, `overflow-x-auto`, `w-max`, etc.).  
   - Custom classes for the **LED** states:  
     - “off” LED: a circular shape with a neutral background.  
     - “on” LED: a circular shape with a glowing border and a bright fill color (e.g., using Tailwind’s `shadow-lg`, `bg-green-500`, etc.).

5. **Scrolling & Centering**  
   - On page load (and refresh), programmatically scroll the container to the column of the **current month**.  
   - This can be done by using a ref to the scroll container and calling `scrollIntoView()` or setting `scrollLeft` to the correct offset.

6. **Year Detection**  
   - The app can default to the **current browser year** on first load.  
   - If localStorage has data for a prior year but the user visits in a new calendar year, trigger the **Reset** prompt or let them continue if they wish.

7. **Reset Workflow**  
   - `confirm("Are you sure...?")` or a custom modal prompting the user.  
   - If “Yes,” clear localStorage for that year’s data and set up a new blank structure.  
   - Provide a final “Export before reset?” prompt or button to allow them to save data.

8. **Export Workflow**  
   - Gather each month’s data in memory, build a Markdown table with row headers for each day (1–31) and column headers for each month.  
   - Use “✅” for days that are on, or a space for off.  
   - Create a downloadable `.md` file client-side (e.g., using a Blob and `URL.createObjectURL`).

---

## Final Deliverables

- A **React + TypeScript** project bootstrapped with your preferred tooling (Create React App, Vite, Next.js, etc.).  
- Tailwind CSS configured for global styling.  
- Fully implemented toggling of days, streak calculation, horizontal scrolling with current month centering, year-end reset, and markdown export.

This spec should be enough for a developer to get started quickly. If any other questions arise—such as advanced features or multi-year data handling—you can extend this plan accordingly.