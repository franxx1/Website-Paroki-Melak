# Navbar Dropdown Logic Explanation

This document explains how the dropdown menus in `navbar.vue` work. We use two different approaches for Desktop and Mobile to ensure the best user experience on each device.

## 1. Desktop: The "Hover" Magic (CSS)

For the desktop view (screens larger than `md`), we use **Tailwind CSS groups** to handle the dropdowns without writing any JavaScript.

### Code Structure
```html
<div class="relative group">
  <!-- The Button -->
  <button class="...">Paroki ...</button>
  
  <!-- The Dropdown Menu -->
  <div class="... invisible opacity-0 group-hover:visible group-hover:opacity-100 ...">
    ...
  </div>
</div>
```

### How it Works
1.  **`group`**: We add the `group` class to the parent container. This tells Tailwind to "watch" this container for interactions (like hovering).
2.  **`group-hover:...`**: On the dropdown menu (the child `div`), we use classes like `group-hover:opacity-100` and `group-hover:visible`.
    *   **Default State**: The menu is `invisible` and has `opacity-0` (hidden).
    *   **Hover State**: When you hover over the *parent* (`group`), the child changes to `visible` and `opacity-100` (shown).
3.  **Why?**: This is extremely fast and responsive because the browser handles it natively with CSS. It feels instant when using a mouse.

---

## 2. Mobile: The "Click" Logic (JavaScript)

On mobile devices, there is no "hover" (you can't hover with a finger). We must use **JavaScript** to track clicks and toggle the menu open or closed.

### The Data (State)
In the `<script>` section, we added a variable called `activeDropdown` to track which menu is open.

```javascript
data() {
  return {
    isOpen: false,        // Tracks if the main mobile menu (hamburger) is open
    activeDropdown: null  // Tracks which specific dropdown is open ('paroki', 'berita', or null)
  }
}
```

### The Logic (Function)
We created a `toggleDropdown` function to handle the clicks.

```javascript
toggleDropdown(name) {
  // If the clicked menu (name) is ALREADY open, close it (set to null).
  // If it is NOT open, open it (set to name).
  this.activeDropdown = this.activeDropdown === name ? null : name
}
```

### The View (HTML)
We connect the data to the HTML using Vue directives.

```html
<!-- The Button -->
<button @click="toggleDropdown('paroki')">
  Paroki
  <!-- Rotate the icon if this menu is open -->
  <svg :class="activeDropdown === 'paroki' ? 'rotate-180' : ''">...</svg>
</button>

<!-- The Menu -->
<!-- Only show this div if activeDropdown is 'paroki' -->
<div v-show="activeDropdown === 'paroki'">
  ... links ...
</div>
```

### How it Works
1.  **`@click`**: When you tap "Paroki", it runs `toggleDropdown('paroki')`.
2.  **State Change**: The `activeDropdown` variable changes to `'paroki'`.
3.  **Reactivity**: Vue notices the data change and updates the DOM:
    *   `v-show` sees the match and displays the menu.
    *   `:class` sees the match and rotates the chevron icon.

## Summary

| Feature | Desktop | Mobile |
| :--- | :--- | :--- |
| **Trigger** | Mouse Hover | Touch / Click |
| **Technology** | CSS (`group-hover`) | JavaScript (Vue State) |
| **State** | Managed by Browser | Managed by `activeDropdown` variable |
