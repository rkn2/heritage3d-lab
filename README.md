# Heritage 3D Lab Website

**Damage. Data. Design.**

This is the official website for the Heritage 3D Lab at Penn State University, directed by Dr. Rebecca Napolitano.

## About

The Heritage 3D Lab leverages AI to reconcile heterogeneous, transdisciplinary data about existing buildings into actionable, explainable information. Our research lies at the intersection of civil engineering, computer science, and historic preservation.

## Features

- **Dynamic Particle Background**: Animated 3D point cloud visualization
- **Rotating Hero Text**: Dynamic text showcasing lab values
- **ORCID Integration**: Automatically pulls publications from ORCID
- **Responsive Design**: Fully responsive across all devices
- **Modern UI**: Premium design with glassmorphism and smooth animations
- **Accessibility**: Semantic HTML and keyboard navigation support

## Local Development

To run this website locally:

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Or use a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve
   ```
4. Visit `http://localhost:8000` in your browser

## Deployment to GitHub Pages

### Option 1: Deploy to username.github.io

1. Create a new repository named `username.github.io` (replace `username` with your GitHub username)
2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Heritage 3D Lab website"
   git branch -M main
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main
   ```
3. Your site will be live at `https://username.github.io`

### Option 2: Deploy to a Project Repository (heritage3d-lab)

1. Create a new repository on GitHub (e.g., `heritage3d-lab`)
2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Heritage 3D Lab website"
   git branch -M main
   git remote add origin https://github.com/username/heritage3d-lab.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Select branch: `main` and folder: `/ (root)`
6. Click Save
7. Your site will be live at `https://username.github.io/heritage3d-lab`

## File Structure

```
website/
├── index.html          # Main HTML structure
├── styles.css          # All styling and design system
├── script.js           # Interactive features and animations
├── logo.png            # Heritage 3D Lab logo
└── README.md           # This file
```

## Customization

### Update Content

- **Team Members**: Edit the People section in `index.html`
- **Research Areas**: Modify the Research section in `index.html`
- **Teaching Info**: Update the Teaching section in `index.html`
- **Contact Email**: Change `nap@psu.edu` to your preferred email

### Update Colors

Colors are defined as CSS variables in `styles.css`:
```css
:root {
    --primary-blue: hsl(200, 65%, 45%);
    --accent-teal: hsl(185, 55%, 50%);
    --accent-brick: hsl(15, 45%, 45%);
    /* ... more colors */
}
```

### Update Rotating Text

Edit the `rotatingTexts` array in `script.js`:
```javascript
const rotatingTexts = [
    "Resilient",
    "Intelligent",
    "Sustainable",
    // Add your own words here
];
```

## ORCID Integration

Publications are automatically fetched from ORCID (ID: 0000-0002-8939-5998). To change this:

1. Open `script.js`
2. Find the `fetchORCIDPublications()` function
3. Update the `orcidId` variable with your ORCID ID

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The website is optimized for performance:
- Particle count adjusts based on screen size
- Animations pause when tab is not visible
- Lazy loading for scroll animations
- Optimized CSS with minimal repaints

## License

© 2024 Heritage 3D Lab, Penn State University. All rights reserved.

## Contact

**Dr. Rebecca Napolitano**  
Email: nap@psu.edu  
ORCID: [0000-0002-8939-5998](https://orcid.org/0000-0002-8939-5998)

---

Built with ❤️ for historic preservation and community resilience
