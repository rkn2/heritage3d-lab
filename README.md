# Heritage 3D Lab Website

**Damage. Data. Design.**

This is the official website for the Heritage 3D Lab at Penn State University.

## 🛠️ How to Update the Website

### 1. Adding a New Student
To add a new graduate student, you need to edit `index.html` and add their photo to the `images/people/` folder.

1.  **Add the Photo**:
    *   Save the student's photo as a `.jpg` or `.png` file.
    *   Place it in the `images/people/` folder.
    *   *Tip: Try to use a square or portrait-oriented image for best results.*

2.  **Edit `index.html`**:
    *   Open `index.html` in a text editor (like VS Code or Notepad).
    *   Search for `<!-- Current Graduate Students -->`.
    *   Copy an existing "person-card" block (from `<div class="person-card">` to the closing `</div>`).
    *   Paste it where you want the new student to appear.
    *   Update the **Name**, **Title**, **Bio**, and **Links** (Email, LinkedIn, Google Scholar).
    *   Update the `src` attribute of the `<img>` tag to match the new filename (e.g., `images/people/new_student.jpg`).

### 2. Moving a Student to Alumni
When a student graduates:

1.  **Cut** their entire "person-card" block from the "Current Graduate Students" section.
2.  **Paste** it into the "Graduated Students" section (search for `<!-- Graduated Students -->`).
3.  Update their **Title** (e.g., change "PhD Student" to "PhD, 2025").

### 3. Updating Research Areas
The "Research Areas" section uses a tabbed interface.

*   Search for `<!-- Research Section -->` in `index.html`.
*   The content for each tab is inside `<div id="damage" class="tab-pane">`, `<div id="data" class="tab-pane">`, etc.
*   To update text or images, modify the content within the `.sub-card` elements.
*   **Images**: Research images are stored in `images/research/`.

### 4. Publications
Publications are **automatically fetched** from Dr. Napolitano's ORCID profile.
*   You do **not** need to manually add publications to the website.
*   Just ensure the ORCID profile is up to date.

## 📂 Project Structure

*   `index.html`: The main page containing all text and layout.
*   `styles.css`: Controls the look and feel (colors, fonts, mobile layout).
*   `script.js`: Handles animations and the publication fetcher.
*   `images/`: Contains all images.
    *   `people/`: Photos of lab members.
    *   `research/`: Images for research areas.

## 🚀 Running Locally

To preview changes on your computer:

1.  Open the folder containing these files.
2.  Double-click `index.html` to open it in your browser.
3.  *Note: Some features (like loading publications) might require a local server due to browser security settings.*

## 🎨 Colors & Style

The website uses a consistent color palette defined in `styles.css`:
*   **Primary Blue**: `hsl(200, 65%, 45%)` (Used for buttons, links, accents)
*   **Deep Blue**: `hsl(215, 100%, 35%)` (Used for "Damage" tab)
*   **Teal**: `hsl(185, 55%, 50%)` (Used for "Design" tab)

---
© 2025 Heritage 3D Lab, Penn State University.
