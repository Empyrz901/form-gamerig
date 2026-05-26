# Gaming PC Configuration Builder 🖥️

A beautiful, interactive web form for designing and configuring gaming PCs. Fill out your preferences and generate a professional PDF configuration document.

## Features

- **Comprehensive Form** with sections for:
  - Case & Form Factor
  - Budget & Purpose
  - Aesthetics (Color Scheme & RGB)
  - Motherboard (WiFi, 10GB Ethernet, Overclocking)
  - CPU (Brand preference with custom model input)
  - RAM (DDR5 6000MHz+ recommended)
  - GPU (Brand preference with VRAM options)
  - CPU Cooling (AIO or Air)
  - Storage (SSD + optional additional storage)
  - PSU (with modular options)
  - Additional Notes

- **Smart Conditional Fields**:
  - RGB Strimer cables option appears when RGB is selected
  - Additional storage details field shows when needed

- **PDF Export**: Generate a professional PDF with all your configuration choices

- **Responsive Design**: Works on desktop, tablet, and mobile devices

- **GitHub Pages Compatible**: No build process required, pure HTML/CSS/JavaScript

## Getting Started

### Local Development

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. Fill out the form with your gaming PC preferences
4. Click **"Generate PDF Configuration"** to export

### Deploy to GitHub Pages

1. Create a GitHub repository (or use an existing one)
2. Push these files to your repository:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Go to repository **Settings** → **Pages**
4. Select **Deploy from a branch**
5. Choose your branch (usually `main`) and click **Save**
6. Your site will be available at `https://yourusername.github.io/your-repo-name/`

## Form Sections Explained

### Motherboard Recommendations
- **Recommended**: ASUS ROG STRIX B650E-E WIFI (best price/quality ratio)
- Supports WiFi, 10GB Ethernet, and high-end VRM for overclocking

### RAM
- Minimum recommended: **6000MHz DDR5**
- Capacities: 32GB, 48GB, 64GB, or 96GB

### Storage
- Primary SSD for OS and main games
- Optional additional SSD for extra gaming/apps storage
- Optional HDD for archival/economical bulk storage

### Cooling Solutions
- AIO Liquid: 240mm, 280mm, or 360mm
- High-end Air Coolers

### RGB Configuration
- No RGB
- Minimal RGB (case fans)
- Moderate RGB (fans + AIO)
- Full RGB with optional Strimer cables for PSU/motherboard cables

### Cable Management
All builds include **presentable cable management** with good organization, though not at the level of premium showcase setups.

## PDF Export Features

The PDF includes:
- System overview with budget and purpose
- Complete component specifications
- All selected preferences and options
- Professional formatting and layout
- Ready to print or share

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5**: Form structure
- **CSS3**: Modern styling with gradients and responsive design
- **JavaScript (Vanilla)**: Form logic and interactions
- **html2pdf.js**: PDF generation via CDN

## Customization

### Modify Form Questions
Edit the relevant `<fieldset>` in `index.html`

### Change Colors
Look for color values in `styles.css`:
- Primary color: `#667eea`
- Accent color: `#764ba2`

### Update Recommendations
Edit the `<p class="note">` elements in `index.html`

### Adjust PDF Layout
Modify the `generateHTMLContent()` function in `script.js`

## Tips for Your Build

- **Monitor Compatibility**: Verify CPU socket and RAM speed match motherboard specs
- **Power Budget**: Ensure PSU wattage covers system + 20% headroom
- **Case Clearance**: Check case can fit your chosen cooler size
- **RGB Sync**: If using RGB, ensure all components use compatible controllers
- **Future Upgrade Path**: DDR5 and modern chipsets have good upgrade potential

## File Structure

```
form-gamerig/
├── index.html      # Main form structure
├── styles.css      # Styling and responsive design
├── script.js       # Form logic and PDF generation
└── README.md       # This file
```

## License

Feel free to use and modify this form for your own purposes.

## Notes

- Form data is only stored locally in your browser during editing
- No data is sent to any server
- PDF generation happens entirely in your browser
- No signup, login, or tracking required
