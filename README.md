# Dabur Nutri Mix Website

Premium Ayurvedic dry fruits nutrition website showcasing Dabur's Nutri Mix product line with official Dabur branding and real product images.

## 🌿 About

This website showcases Dabur Nutri Mix - a premium Ayurvedic dry fruits nutrition range available in three convenient formats:

- **Traditional Recipe Jar** - 300g family pack with authentic Ayurvedic formulation
- **Premium Dry Fruits & Seeds Box** - 200g instant mixing formula perfect for milk and smoothies  
- **100% Natural Wellness Blend Pouch** - 150g travel-friendly format for daily wellness

Built with Dabur's 135+ years of Ayurvedic expertise and modern web technology.

## 🚀 Features

### Brand Identity
- **Official Dabur Logo** - Authentic Dabur branding in navigation and footer
- **Authentic Dabur Colors** - Green and orange color scheme
- **Ayurvedic Heritage** - Emphasizes 135+ years of traditional wisdom
- **Real Product Images** - Showcases actual Nutri Mix product photos

### Interactive Elements
- **Hero Carousel** - Showcasing all three product variants with real images
- **Nutrition Calculator** - Personalized recommendations based on age, activity level, and health goals
- **Ayurvedic Chatbot** - Expert nutrition assistant for product queries and wellness advice
- **Product Modals** - Detailed information about each product format
- **Recipe Gallery** - Traditional and modern recipes using Nutri Mix
- **Benefits Explorer** - Interactive cards explaining Ayurvedic health benefits

### Modern Web Design
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - CSS animations and transitions for enhanced UX
- **Image Fallbacks** - Graceful handling of missing product images with styled placeholders
- **Performance Optimized** - Lazy loading and optimized image handling

## 📁 File Structure

```
dabur-nutri-mix/
├── index.html          # Main HTML file with Dabur branding
├── style.css           # Complete CSS styling with Dabur colors
├── app.js              # JavaScript functionality with image fallbacks
├── README.md           # This documentation file
├── product-jar.jpg     # Product image for Traditional Recipe Jar (300g)
├── product-box.jpg     # Product image for Premium Box (200g)
└── product-pouch.jpg   # Product image for Wellness Pouch (150g)
```

## 📷 Setting Up Product Images

### Required Product Images

To use the actual product images from your attachments, you need to save and rename them:

1. **product-jar.jpg** - The Traditional Recipe Jar (300g family pack)
   - Use the jar image from your attachments
   - Recommended size: 400x400 pixels or larger
   - Format: JPG or PNG

2. **product-box.jpg** - The Premium Dry Fruits & Seeds Box (200g)
   - Use the box image from your attachments  
   - Recommended size: 400x400 pixels or larger
   - Format: JPG or PNG

3. **product-pouch.jpg** - The Wellness Blend Pouch (150g)
   - Use the pouch image from your attachments
   - Recommended size: 400x400 pixels or larger
   - Format: JPG or PNG

### Image Setup Instructions

1. **Save Your Product Images:**
   - Save the jar image as `product-jar.jpg`
   - Save the box image as `product-box.jpg`  
   - Save the pouch image as `product-pouch.jpg`

2. **Upload to Repository:**
   - Place all three image files in the same directory as your HTML file
   - Ensure file names match exactly (case-sensitive)

3. **Automatic Fallbacks:**
   - If images fail to load, the website automatically shows styled placeholders
   - Placeholders match Dabur's brand colors and include product information
   - No manual intervention required for missing images

### Alternative: Using Online Images

If you prefer to host images online:

1. Upload images to an image hosting service (imgur, GitHub, etc.)
2. Replace the `src` attributes in `index.html`:
   ```html
   <img src="your-image-url-here" alt="Product Name">
   ```
3. Update all instances of `product-jar.jpg`, `product-box.jpg`, and `product-pouch.jpg`

## 🎨 Design System

### Dabur Brand Colors
- **Primary Green**: `#52B12F` (Dabur Bright Green)
- **Dark Green**: `#1B5C29` (Dabur Dark Green)  
- **Accent Orange**: `#F4711F` (Dabur Orange)
- **Light Green**: `#8CC63F` (Dabur Light Green)
- **Background**: `#FFF8E7` (Dabur Cream)

### Official Branding
- **Dabur Logo**: Loaded from Wikimedia Commons (official source)
- **Typography**: Inter font family for modern readability
- **Ayurvedic Messaging**: Emphasizes traditional heritage and natural wellness

### Components
- **Buttons**: Rounded corners with gradient backgrounds
- **Cards**: Subtle shadows with hover effects  
- **Forms**: Clean inputs with green accent colors
- **Navigation**: Fixed header with Dabur logo and smooth scrolling

## 🚀 Deployment Instructions

### GitHub Pages (Recommended)
1. **Create Repository:**
   - Create a new GitHub repository
   - Name it something like `dabur-nutri-mix-website`

2. **Upload Files:**
   - Upload all 4 files: `index.html`, `style.css`, `app.js`, `README.md`
   - Upload your 3 product images: `product-jar.jpg`, `product-box.jpg`, `product-pouch.jpg`

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to Pages section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

4. **Access Website:**
   - Your site will be available at: `https://yourusername.github.io/repository-name`
   - GitHub will provide the exact URL after setup

### Other Hosting Platforms
The website works on any static hosting service:
- **Netlify**: Drag and drop all files
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Deploy via CLI
- **AWS S3 + CloudFront**: Static website hosting

## 🔧 Customization Options

### Updating Product Information
Modify product details in `app.js`:
```javascript
const productInfo = {
  jar: {
    title: "Your Product Title",
    description: "Product description",
    features: ["Feature 1", "Feature 2"],
    usage: ["Usage 1", "Usage 2"]
  }
};
```

### Changing Brand Colors
Update CSS custom properties in `style.css`:
```css
:root {
  --dabur-dark-green: #1B5C29;
  --dabur-bright-green: #52B12F;
  --dabur-orange: #F4711F;
}
```

### Adding More Products
1. Add product images to the directory
2. Update the HTML carousel and product cards
3. Extend the `productInfo` object in JavaScript
4. Add corresponding CSS styles if needed

## 📱 Responsive Design Features

- **Mobile-First Approach**: Designed for mobile devices first
- **Flexible Grid System**: Adapts to all screen sizes  
- **Touch-Friendly**: Swipe support for carousel navigation
- **Optimized Images**: Automatic scaling and fallbacks
- **Readable Typography**: Scales appropriately on all devices

## ⚡ Performance Features

- **Lazy Loading**: Images load as they come into view
- **Debounced Events**: Optimized scroll and resize handling  
- **CSS Animations**: Hardware-accelerated transitions
- **Minimal Dependencies**: Pure HTML, CSS, and JavaScript
- **Fallback System**: Graceful degradation for missing resources

## 🤖 Interactive Features

### Ayurvedic Nutrition Assistant
- Natural language processing for product queries
- Ayurvedic knowledge base with 135+ years of wisdom
- Health and nutrition guidance
- Recipe suggestions and wellness tips

### Personalized Nutrition Calculator  
- Age-based recommendations
- Activity level considerations
- Health goal optimization
- Product format suggestions

### Recipe Gallery
- Traditional Ayurvedic preparations
- Modern healthy recipes
- Difficulty ratings and prep times
- Video recipe links (placeholders)

## 🛍️ E-commerce Integration

### Multi-Platform Support
- Quick delivery: Blinkit, Zepto, Swiggy Instamart
- E-commerce: BigBasket, Amazon, Flipkart  
- Pharmacies: Apollo, MedPlus, 1mg
- Pincode-based availability checker

### Purchase Flow
- Direct links to product pages
- Platform-specific fallback URLs
- Special offers and promotions display
- Location-based service availability

## 🔒 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Fallback Support**: Graceful degradation for older browsers
- **Progressive Enhancement**: Core functionality works everywhere

## 📞 Support & Maintenance

### Image Issues
- **Missing Images**: Automatic fallback placeholders appear
- **Broken Links**: Check file names and paths
- **Loading Problems**: Verify image formats and sizes

### Performance Monitoring
- Check browser console for any JavaScript errors
- Verify all images load correctly
- Test responsive design on various devices
- Ensure smooth animations and transitions

### Content Updates
- Product information: Update `app.js` productInfo object
- Recipes: Modify HTML recipe sections
- Benefits: Update benefits cards in HTML
- Testimonials: Change customer reviews in HTML

## 🏷️ License & Attribution

This project is created for Dabur marketing purposes. 

**Important Notes:**
- All Dabur branding and trademarks belong to Dabur India Ltd.
- Dabur logo used from official Wikimedia Commons source
- Product images should be official Dabur product photos
- Website designed for educational/marketing use

## 🎯 Key Benefits

### For Marketing Teams
- **Ready-to-Deploy**: Complete website in 4 files
- **Brand Compliant**: Official Dabur colors and logo
- **Mobile Optimized**: Works perfectly on all devices
- **Interactive**: Engaging user experience with chatbot and calculator

### For Development Teams  
- **Clean Code**: Well-structured HTML, CSS, and JavaScript
- **Documented**: Comprehensive comments and documentation
- **Modular**: Easy to customize and extend
- **Performance**: Optimized for fast loading and smooth interactions

### For Business Goals
- **Lead Generation**: Nutrition calculator and chat assistant
- **Brand Awareness**: Authentic Dabur heritage and Ayurvedic messaging  
- **Product Education**: Detailed product information and benefits
- **Sales Conversion**: Direct links to purchase platforms

---

**Built with 🌿 for Dabur's Ayurvedic Excellence**

*Celebrating 135+ years of natural wellness and traditional wisdom*

**Ready to Launch:** Upload these files to any web hosting service and your Dabur Nutri Mix website goes live instantly!